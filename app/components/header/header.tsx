import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import NavbarCategories from "./categories";

export default function Header() {
    return (
        <header className="w-screen py-1">
            <Navbar className="h-[80px] flex items-center" classNames={{
                wrapper: "max-w-none px-20"
            }}>
                <NavbarBrand>
                    <Link href="/"><Image src="/brand/logo.png" alt="Based Logo" width={157} height={50} /></Link>
                </NavbarBrand>
                <NavbarContent className="gap-20 !justify-center">
                    <Link href="/featured"><NavbarItem className="text-xl font-medium">Featured</NavbarItem></Link>
                    <NavbarCategories />
                    <Link href="/about"><NavbarItem className="text-xl font-medium">About</NavbarItem></Link>
                </NavbarContent>
                <NavbarContent justify="end">
                    <Link href="/analyze"><Button color="primary" className="font-medium text-base py-[22px]">Analyze Story</Button></Link>
                </NavbarContent>
            </Navbar>
        </header>
    );
}