import { Link } from "react-router-dom"

 

export default function ComponentSuspended() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your Account Has Been Suspended
        </h1>
        <p className="mt-4 text-muted-foreground">
          We're sorry, but your account has been suspended due to a violation of our terms of service. Please contact
          our customer support team to resolve this issue.
        </p>
        <div className="mt-6">
          <Link
           to="#"
            className="inline-flex items-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-red-50 shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
           
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}

function TriangleAlertIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}