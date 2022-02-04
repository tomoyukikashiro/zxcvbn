import axios from 'axios'
import XLSX from 'xlsx'
import { promises as fs } from 'fs'
import BasicGenerator, {
  DefaultOptions,
  defaultOptions,
} from './BasicGenerator'

export interface ExcelGeneratorOptions extends DefaultOptions {
  url: string
  /**
   * Row + column indicate a cell coordinate, and will include all cells
   * under (and including) this cell until an empty cell is found
   */
  row: number
  column: number
  sheetName?: string
  /**
   * The occurences count should be the cell after (right side) of the name.
   * Set to undefined if occurences are missing in the excel file
   */
  minOccurrences?: number
}

const excelGeneratorOptions: ExcelGeneratorOptions = {
  ...defaultOptions,
  url: '',
  row: 1,
  column: 1,
}

export default class ExcelGenerator extends BasicGenerator {
  readonly url: string

  options: ExcelGeneratorOptions

  constructor(url: string, options: ExcelGeneratorOptions) {
    super(options)
    this.url = url
    this.options = { ...excelGeneratorOptions }
    Object.assign(this.options, options)
  }

  async getData() {
    // Download the file
    console.info('Fetching excel file')
    const response = await axios.get(this.options.url, {
      responseType: 'arraybuffer',
    })
    return response.data
  }

  // eslint-disable-next-line complexity,max-statements
  public async run(output: string) {
    const data = new Uint8Array(await this.getData())

    console.info('Parsing file')
    const workbook = XLSX.read(data, { type: 'array' })
    const sheet =
      workbook.Sheets[this.options.sheetName ?? workbook.SheetNames[0]]

    if (!sheet['!ref']) {
      throw new Error('Missing ref in sheet')
    }
    const range = XLSX.utils.decode_range(sheet['!ref'])

    console.info('Reading values')

    // Loop until we reach an emtpy cell or the end
    for (
      let row = range.s.r + this.options.row - 1;
      row <= range.e.r;
      row += 1
    ) {
      const cellAddress = { c: this.options.column + range.s.c - 1, r: row }
      /* if an A1-style address is needed, encode the address */
      const cellRef = XLSX.utils.encode_cell(cellAddress)
      const cell = sheet[cellRef] as XLSX.CellObject | undefined
      if (!cell) {
        break
      }
      const value = `${cell.w ?? cell.v ?? ''}`
      if (value.length === 0) {
        break
      }

      if (this.options.minOccurrences) {
        const cellAddressMin = { c: this.options.column + range.s.c, r: row }
        /* if an A1-style address is needed, encode the address */
        const cellRefMin = XLSX.utils.encode_cell(cellAddressMin)
        const cellMin = sheet[cellRefMin] as XLSX.CellObject | undefined
        if (!cellMin) {
          throw new Error(`Missing occurence at ${cellRefMin}`)
        }
        const occurence = cellMin.v

        if (typeof occurence !== 'number') {
          throw new Error(`Expecting number at ${cellRefMin}`)
        }

        if (occurence < this.options.minOccurrences) {
          // Don't add this one
          // eslint-disable-next-line no-continue
          continue
        }
      }
      this.data.push(value)
    }

    this.trimWhitespaces()
    this.convertToLowerCase()
    this.removeDuplicates()

    console.info('Saving to disk')

    const json = JSON.stringify(this.data)
    await fs.writeFile(`${output}.json`, json)
  }
}
