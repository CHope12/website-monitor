import { MdMonitorHeart } from "react-icons/md"

export default function Login() {

  return (
    <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <a href="/auth/login "className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8">
        Login
      </a>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />          
          <div className="relative z-20 flex items-center text-lg font-medium">
            <a href="/" className="flex gap-2 text-3xl items-center">
              <MdMonitorHeart />Monitorly
            </a>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
            <p className="text-lg">“Since using Monitorly, we've had complete peace of mind knowing our website is always up and running. The real-time alerts and detailed analytics have helped us catch downtime before our customers even notice. A must-have tool for any business that relies on its website!”
            </p>
            <footer className="text-sm">— Alex Carter, CTO at TechFlow Inc.</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account or login
              </h1>
            </div>
            <div className="grid gap-6">                            
              <a href="/auth/login" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                Continue
              </a>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />                
              </div>
            </div>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">By clicking continue, you agree to our
            <a className="underline underline-offset-4 hover:text-primary" href="/terms"> Terms of Service </a>
            <a className="underline underline-offset-4 hover:text-primary" href="/privacy"> Privacy Policy </a>        
          </p>
        </div>
      </div>
    </div>
  )
}