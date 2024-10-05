import { LoadingSpinner } from "components/LoadingSpinner";
import { Routes } from "constants/routes";
import { rangerDirectMessage, selectAuthError } from "modules";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"



export default function ComponentEmail_Verified() {

    const history = useHistory();
    const dispatch = useDispatch()
    const { token , uid  } = useParams<{ token: string , uid : string}>()

    setTimeout(() => {

        dispatch(rangerDirectMessage({ event: 'login', streams: [token, navigator.userAgent , uid ] }) as any);
    }, 1000);

    const selectAuth = useSelector(selectAuthError)

    return (
        <>
        <LoadingSpinner   />
        <div  className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="mx-auto h-16 w-16 text-green-500" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{selectAuth || 'Email Verified!'}</h1>
                <p className="mt-4 text-muted-foreground">

                    {selectAuth ? `The link you used to verify your email address is no longer valid. Please request a new verification email to continue.` : `Congratulations, you have successfully verified your email address. You can now continue to explore our'  platform.`}
                </p>
                <div className="mt-6" >
                    <button onClick={() => selectAuth ? dispatch(rangerDirectMessage({ event: 'auth_link', streams: [token, navigator.userAgent] }) as any) :  history.push(Routes.Dashboard)}

                        className="inline-flex  text-cyan-50 items-center rounded-md bg-primary outline-none px-4 py-2 text-sm bg-black border-none font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"

                    > { selectAuth ? 'Resend Verification Email' : 'Go to Dashboard'}
                        
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}