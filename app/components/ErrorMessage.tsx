const ErrorMessage = ({ children }: React.PropsWithChildren) => {
  if (!children) return null
  return <p className="bg-red-300">{children}</p>
}

export default ErrorMessage
