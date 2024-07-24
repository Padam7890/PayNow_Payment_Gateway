import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null,
        id?:string | null,
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}



export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {

    return <div className="flex bg-white shadow justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PAy Now
        </div>
        
        <div className="flex flex-col justify-center pt-2">
            {
                user? 
                <div className="flex gap-5 items-center justify-center">
                    <span>Welcome, {user.id? user.name : "Stranger"}
                    </span>
                    <Button  onClick={onSignout}>Logout</Button>

                </div>: 
                <div>
                    <Button onClick={onSignin}>Login</Button>
                </div>
            }
            {/* <Button onClick={user ? onSignout : onSignin}>{user ? `Logout` : "Login"}</Button> */}
        </div>
    </div>
}