export class Logger {
  constructor (private className: string) {}

  public log(methodName: string, message: string){
    console.log(`Class: '${this.className}', Method: '${methodName}', Logs: '${message}'`);
  }

  public error (methodName: string, message: string) {
    throw new Error(`Class: '${this.className}', Method: '${methodName}', Error: '${message}'`);
  }
}
