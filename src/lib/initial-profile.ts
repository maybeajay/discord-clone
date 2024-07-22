import { RedirectToSignIn } from '@clerk/nextjs'
redirect
import { currentUser } from '@clerk/nextjs/server';

import { redirect } from 'next/navigation';
import prisma from './db';

export const initalProfile = async ()=>{
    const user = await currentUser();

    if(!user){
        return RedirectToSignIn
    }

    const profile = await prisma.profile.findUnique({
        where:{
            userId: user.id
        }
    })
    // if profile exist return the profile
    if(profile){
        return profile;
    }

    // else create one
    const newProfile = await prisma.profile.create({
        data:{
        userId: user.id,
        // name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress
        }
    })
    // and return
    
    return newProfile;
}