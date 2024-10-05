import React, { useState, useEffect } from "react";
import { Button } from "antd";

export default function ComponentMail(): JSX.Element {
  // Initialize countdown from localStorage or default to 60 seconds
  const initialCountdown: number = parseInt(localStorage.getItem('countdown') || '0', 10);
  const [countdown, setCountdown] = useState<number>(initialCountdown);

  useEffect(() => {
    // Check if the stored countdown is still valid
    const storedTime = localStorage.getItem('countdownTime');
    if (storedTime) {
      const now = new Date().getTime();
      const timePassed = Math.floor((now - parseInt(storedTime, 10)) / 1000);
      const newCountdown = initialCountdown - timePassed;
      if (newCountdown > 0) {
        setCountdown(newCountdown);
      } else {
        localStorage.removeItem('countdown');
        localStorage.removeItem('countdownTime');
        setCountdown(0);
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      // Start a countdown if there's time left
      timer = setInterval(() => {
        setCountdown(prevCountdown => {
          const newCountdown = prevCountdown - 1;
          localStorage.setItem('countdown', newCountdown.toString());
          return newCountdown;
        });
      }, 1000);
    }
    // Clear the timer on component unmount
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [countdown]);

  const handleResendEmail = (): void => {
    const now = new Date().getTime();
    localStorage.setItem('countdownTime', now.toString());
    setCountdown(60);
    localStorage.setItem('countdown', '60');
    // Add logic to resend the email here
  };

  // Calculate minutes and seconds
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;


  
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <MailOpenIcon className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Verify your email</h1>
        <p className="mt-4 text-muted-foreground">
          We've sent a verification email to your inbox. Please check your email and click the link to verify your
          account.
        </p>
        <div className="mt-6">
          <Button
            onClick={handleResendEmail}
            disabled={countdown > 0}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {countdown > 0
              ? `Resend email in ${minutes}m ${seconds}s`
              : 'Resend verification email'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// TypeScript type for the props
interface MailOpenIconProps extends React.SVGProps<SVGSVGElement> { }

function MailOpenIcon(props: MailOpenIconProps): JSX.Element {
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
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
    </svg>
  );
}
