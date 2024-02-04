"use client";
import Link from "next/link"
import { JSX, SVGProps, useContext, useEffect, useState } from "react"
import Image from "next/image"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage, FormItem } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { AppContextData } from "@/contexts/AppContext";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { potPDA, vaultPDA } from "@/utils/program";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import { confirmTx } from "@/utils/helper";


export default function CreatePot() {
    const [pot, setPot] = useState({
        name: "",
        description: "",
        cycle: "",
        max_capacity: 0,
        contribution_amount: 0,
    });

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setMounted(true)
        }
    }, [])

    const handleSubmit = async () => {
        console.log(pot)
    }

    const formSchema = z.object({
        name: z.string().min(4).max(15),
        description: z.string().min(10).max(35),
        cycle: z.enum(["Daily", "Weekly", "Monthly"]),
        max_capacity: z.number().min(2).max(10),
        contribution_amount: z.number().min(1).max(1000000),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "Billion club",
            description: "Odogwu abughi guy name",
            cycle: "Daily",
            max_capacity: 2,
            contribution_amount: 10,
        }
    })

    const { program, profilePDA, connection, connection_status } = useContext(AppContextData);

    const wallet = useAnchorWallet();
    const [loader, setLoader] = useState(false);


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        // validate


        if (!program) return;

        // Pot PDA generation
        const potPD = await potPDA(pot.name, wallet?.publicKey as PublicKey);
        const vaultPD = await vaultPDA(potPD);

        let cycle = values.cycle == "Daily" ? { daily: {} } : values.cycle == "Weekly" ? { weekly: {} } : { monthly: {} };
        let contribution_amount: BN = new BN(values.contribution_amount).mul(new BN(LAMPORTS_PER_SOL));
        let created_at = Date.now().toString();
        try {
            const tx = await program.methods
                .createPot(
                    values.description,
                    values.name,
                    cycle,
                    created_at,
                    values.max_capacity,
                    contribution_amount
                )
                .accounts({
                    pot: potPD,
                    payer: wallet?.publicKey,
                    members: profilePDA as PublicKey,
                    vault: vaultPD,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();
            await confirmTx(tx as unknown as string, connection);

        } catch (error) {
            console.log(error);

        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-purple-600 to-blue-500">
                <Link className="flex items-center justify-center" href="#">
                    <MountainIcon className="h-6 w-6 text-white" />
                    <span className="sr-only">GroupVault</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    {mounted ? <WalletMultiButton /> : null}

                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-600 to-blue-500">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <Image
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
                                height="550"
                                src="/create-vault.jpeg"
                                width="550"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                                        Create a Group Vault
                                    </h1>
                                    <p className="max-w-[600px] text-gray-200 md:text-xl">
                                        Start a new savings journey with your group. Fill in the details below to create a new vault.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-0.1 min-[400px]:flex-row">

                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Name</FormLabel>
                                                        <FormControl className="text-black">
                                                            <Input placeholder="Billion" {...field} />
                                                        </FormControl>
                                                        <FormDescription className="text-black">
                                                            Your group vault name
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl className="text-black">
                                                            <Input placeholder="Group Vault description" {...field} />
                                                        </FormControl>
                                                        <FormDescription className="text-black">
                                                            Write a brief description of your vault.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="cycle"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Cycle</FormLabel>
                                                        <Select onValueChange={field.onChange}>
                                                            <FormControl className="text-black">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a verified email to display" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="text-black">
                                                                <SelectItem value="Daily">Daily</SelectItem>
                                                                <SelectItem value="Weekly">Weekly</SelectItem>
                                                                <SelectItem value="Monthly">Monthly</SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="max_capacity"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Group vault maximum capacity</FormLabel>
                                                        <FormControl className="text-black">
                                                            <Input placeholder="Group Vault maximum capacity" {...field} />
                                                        </FormControl>
                                                        <FormDescription className="text-black">
                                                            The max capacity the vault should have
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="contribution_amount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Group vault contribution amount</FormLabel>
                                                        <FormControl className="text-black">
                                                            <Input placeholder="Group Vault contribution amount" {...field} />
                                                        </FormControl>
                                                        <FormDescription className="text-black">
                                                            The vault contribution amount.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit">Submit</Button>
                                        </form>
                                    </Form>

                                    {/* <Link
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                        href="#"
                                    >
                                        Create Vault
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
                <p className="text-xs text-gray-300">© 2024 GroupVault Inc. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}
