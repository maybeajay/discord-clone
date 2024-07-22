import db from "@/lib/db";
import { initalProfile } from "@/lib/initial-profile";
import  {redirect} from 'next/navigation'
import { InitialModal } from "@/components/ui/modals/initial-modal";
const SetupPage = async ()=>{
    const profile = await initalProfile();
    console.log("THIS IS PROFILE", profile)
    const server = await db?.server?.findFirst({
        where:{
            member:{
                some:{
                    profileId: "eo2ieq2jq02iq0eq0wieqwe"
                }
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    }
    return <InitialModal />
}

export default SetupPage;