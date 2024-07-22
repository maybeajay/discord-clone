"use client";
import { useForm } from 'react-hook-form';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '../../ui/dialog'
import axios from 'axios'
import * as Z from "zod"
import {zodResolver} from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField, 
    FormItem,
    FormLabel,
    FormMessage
} from '../form'

import { Button } from '../button';
import { Input } from '../input';
import { useEffect, useState } from 'react';
import FileUpload from '@/components/file-upload';
import { useRouter } from 'next/navigation';
const formSchema = Z.object({
    name: Z.string().min(1, {
        message: "Server name is required"
    }),
    imageUrl: Z.string().min(6,{
        message: "Server image is required"
    })
})

export const InitialModal = ()=>{
    const [isMounted, setisMounted] = useState(false);
    useEffect(()=>{
        setisMounted(true);
    },[])
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues:{
        name: "",
        imageUrl: ""
      }  
    })

    const isLoading = form.formState.isSubmitting;

    const router = useRouter();

    const onSubmit = async(values: Z.infer<typeof formSchema>)=>{
        try {
            await axios.post("api/servers/", values);
            form.reset();
            router.refresh();
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }
    if(!isMounted) {
        return null;
    }

    return(
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and an image. You can always change it later
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                               <FormField 
                                control={form.control}
                                name='imageUrl'
                                render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                        <FileUpload 
                                        endpoint="serverImage"
                                        value={field.value}
                                        onchange={field.onChange}
                                        />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-zinc-500">
                                        Server Name
                                    </FormLabel>

                                    <FormControl>
                                        <Input 
                                        className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                        disabled={isLoading} 
                                        placeholder='Enter Server Name'
                                        {...field}
                                        />
            
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        {/* Create button */}

                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                            <Button disabled={isLoading} variant={"primary"}>Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}