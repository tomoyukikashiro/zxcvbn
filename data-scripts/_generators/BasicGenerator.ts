export interface DefaultOptions {
  splitter: string
  commentPrefixes: string[]
  removeDuplicates: boolean
  trimWhitespaces: boolean
  toLowerCase: boolean
  encoding?: string
  minLength: number
  clearCompoundNames: boolean
  compoundNamesSeparator: string
}

export const defaultOptions: DefaultOptions = {
  splitter: '\n',
  commentPrefixes: ['#', '//'],
  removeDuplicates: true,
  trimWhitespaces: true,
  toLowerCase: true,
  minLength: 2,
  clearCompoundNames: false,
  compoundNamesSeparator: ' ',
}

export default class BasicGenerator {
  data: any[] = []

  options: DefaultOptions

  constructor(options: DefaultOptions) {
    this.options = { ...defaultOptions }
    Object.assign(this.options, options)
  }

  async getData() {
    return []
  }

  protected filterMinLength() {
    if (this.options.minLength) {
      console.info('Filtering password that are to short')
      this.data = this.data.filter((item) => {
        return item.length >= this.options.minLength
      })
    }
  }

  protected commentPrefixes() {
    if (Array.isArray(this.options.commentPrefixes)) {
      console.info('Filtering comments')
      this.options.commentPrefixes.forEach((prefix) => {
        this.data = this.data.filter((l) => !l.startsWith(prefix))
      })
    }
  }

  protected trimWhitespaces() {
    if (this.options.trimWhitespaces) {
      console.info('Filtering whitespaces')
      this.data = this.data.map((l) => l.trim())
    }
  }

  protected convertToLowerCase() {
    if (this.options.toLowerCase) {
      console.info('Converting to lowercase')
      this.data = this.data.map((l) => l.toLowerCase())
    }
  }

  protected removeDuplicates() {
    if (this.options.removeDuplicates) {
      console.info('Filtering duplicates')
      this.data = this.data.filter((item, pos) => {
        return this.data.indexOf(item) === pos
      })
    }
  }

  protected clearCompoundNames() {
    if (this.options.clearCompoundNames) {
      console.info('Clearing compound names')
      this.data = this.data.map((item) => {
        return item.split(this.options.compoundNamesSeparator)[0]
      })
    }
  }

  public async run(): Promise<string[]> {
    return []
  }
}
