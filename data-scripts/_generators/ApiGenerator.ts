import axios from 'axios'
import BasicGenerator, {
  defaultOptions,
  DefaultOptions,
} from './BasicGenerator'

interface ApiGeneratorOptions extends DefaultOptions {
  requestConfig?: object
  mapFunction: Function
  hasOccurrences: boolean
  minOccurrences: number
}

const apiGeneratorOptions: ApiGeneratorOptions = {
  ...defaultOptions,
  mapFunction: (entry: any) => entry,
  hasOccurrences: false,
  minOccurrences: 500,
}

export default class ApiGenerator extends BasicGenerator {
  readonly url: string

  options: ApiGeneratorOptions

  constructor(url: string, options: ApiGeneratorOptions) {
    super(options)
    this.url = url
    this.options = { ...apiGeneratorOptions }
    Object.assign(this.options, options)
  }

  async getData() {
    const result = await axios.get(this.url, { ...this.options.requestConfig })
    return result.data
  }

  private filterOccurrences() {
    if (this.options.hasOccurrences) {
      console.info('Removing occurrence info')
      this.data = this.data
        .filter((entry) => {
          return entry.occurrences >= this.options.minOccurrences
        })
        .map((entry) => entry.name)
    }
  }

  public async run(): Promise<string[]> {
    console.info('Downloading')
    const data = await this.getData()
    this.data = data.map(this.options.mapFunction)
    this.filterOccurrences()
    this.trimWhitespaces()
    this.convertToLowerCase()
    this.filterMinLength()
    return this.data
  }
}
