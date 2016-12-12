module.exports = {
  handler: 'index.handler',
  description: 'demo',
  timeout: 300, // seconds
  memorySize: 1024, // MB
  role: process.env.TEST_ROLE,
  functionName: 'sjs-sample',
  region: 'ap-northeast-1',
  runtime: 'nodejs4.3'
}

