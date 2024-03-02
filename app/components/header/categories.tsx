"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from "@nextui-org/react";
import Image from "next/image";

const ChevronDown = ({ fill, size, height, width, ...props }: any) => {
    return (
        <svg
            fill="none"
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};

export default function NavbarCategories() {
    return (
        <Dropdown>
            <NavbarItem>
                <DropdownTrigger>
                    <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent text-xl font-medium"
                        endContent={<ChevronDown fill="currentColor" size={24} />}
                        radius="sm"
                        variant="light"
                    >
                        Categories
                    </Button>
                </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
                aria-label="ACME features"
                className="w-[340px]"
                itemClasses={{
                    base: "gap-4",
                }}
            >
                <DropdownItem key="test" href="/articles" startContent={<Image src="/categories/us.png" width={48} height={48} alt="US" />}>
                    <span className="text-lg font-bold">US</span>
                    <p className="text-gray-500">The latest news from the US</p>
                </DropdownItem>
                <DropdownItem key="test" href="/articles" startContent={<Image src="/categories/world.png" width={48} height={48} alt="World" />}>
                    <span className="text-lg font-bold">World</span>
                    <p className="text-gray-500">The latest world news</p>
                </DropdownItem>
                <DropdownItem key="test" href="/articles" startContent={<Image src="/categories/business.png" width={48} height={48} alt="Business" />}>
                    <span className="text-lg font-bold">Business</span>
                    <p className="text-gray-500">Check on the markets!</p>
                </DropdownItem>
                <DropdownItem key="test" href="/articles" startContent={<Image src="/categories/sports.png" width={48} height={48} alt="Sports" />}>
                    <span className="text-lg font-bold">Sports</span>
                    <p className="text-gray-500">Keep up on your favorite leagues and teams</p>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}