import { readFile, writeFile } from 'fs/promises';

interface GraphQLPayload {
  query: string;
  variables: Record<string, unknown>;
}

export class FormatGraphQLPayload {

  private inputPath: string;

  private outputPath: string;

  public constructor() {
    if (!process.argv[2]) {
      console.error('Please provide the path to the input file.');
      return;
    }
    if (!process.argv[3]) {
      console.error('Please provide the path to the output file.');
      return;
    }
    this.inputPath = process.argv[2];
    this.outputPath = process.argv[3];
    this.init();
  }

  private async init() {
    const payload = await this.getPayload();
    const output = 
      `variables: ${JSON.stringify(payload.variables, null, 2)}` +
      `\n\n=========================\n\n${payload.query}`;
    await writeFile(this.outputPath, output, 'utf-8');
  }

  private async getPayload(): Promise<GraphQLPayload> {
    const payload = await readFile(this.inputPath, 'utf-8');
    return JSON.parse(payload);
  }
}

const formatGraphQLPayload = new FormatGraphQLPayload();