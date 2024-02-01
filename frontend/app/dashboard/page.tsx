"use client"
import { Input } from "@/components/ui/input"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { JSX, ClassAttributes, HTMLAttributes } from "react"

export default function DashBoard() {
    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">Overview</h1>
                        <div className="flex items-center space-x-4">
                            <Input className="border p-2 rounded" placeholder="Search" type="search" />
                            <Avatar>
                                <AvatarImage alt="User Profile" src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback>ZM</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="col-span-1 md:col-span-2">
                            <CardHeader>
                                <CardTitle>Tanda Contributions</CardTitle>
                                <CardDescription>GroupVault Tanda contributions over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium">$ 27,482.00</p>
                                        <p className="text-sm text-gray-500">Total balance</p>
                                    </div>
                                    <BarChart className="w-full h-[200px]" />
                                </div>
                            </CardContent>
                        </Card>
                        <div className="grid grid-cols-1 gap-4">
                            <Card>
                                <CardContent>
                                    <h3 className="text-lg font-medium">Your Vaults</h3>
                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                        <Badge variant="default">Savings Pot</Badge>
                                        <Badge variant="default">Holiday Fund</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-black text-white">
                                <CardContent>
                                    <h3 className="text-lg font-medium">Join GroupVault!</h3>
                                    <p className="text-sm">Start saving with friends and family on the Solana blockchain.</p>
                                    <Button className="mt-4" variant="secondary">
                                        Learn more
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Tabs>
                            <div className="flex space-x-2">
                                <Button variant="ghost">24h</Button>
                                <Button variant="ghost">Top gainers</Button>
                            </div>
                        </Tabs>
                        <div className="mt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Change</TableHead>
                                        <TableHead>Market Cap</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">GroupVault</TableCell>
                                        <TableCell>$2.42</TableCell>
                                        <TableCell className="text-green-500">+13.38%</TableCell>
                                        <TableCell>$399.8M</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">FamilyFund</TableCell>
                                        <TableCell>$7.48</TableCell>
                                        <TableCell className="text-green-500">+11.39%</TableCell>
                                        <TableCell>$152.5M</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">FriendsPool</TableCell>
                                        <TableCell>$0.0184</TableCell>
                                        <TableCell className="text-green-500">+7.57%</TableCell>
                                        <TableCell>$1.2B</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function BarChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props}>
            <ResponsiveBar
                data={[
                    { name: "Jan", count: 111 },
                    { name: "Feb", count: 157 },
                    { name: "Mar", count: 129 },
                    { name: "Apr", count: 150 },
                    { name: "May", count: 119 },
                    { name: "Jun", count: 72 },
                ]}
                keys={["count"]}
                indexBy="name"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.3}
                colors={["#2563eb"]}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 4,
                    tickPadding: 16,
                }}
                gridYValues={4}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                }}
                tooltipLabel={({ id }) => `${id}`}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing data"
            />
        </div>
    )
}
