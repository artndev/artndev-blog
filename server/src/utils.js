export const errHandler = err => {
  const { message, ...answer } = err

  return {
    message:
      typeof err === 'string' ? err : message || 'Message is not provided',
    answer: typeof err === 'object' && !Array.isArray(err) ? answer : null,
  }
}
