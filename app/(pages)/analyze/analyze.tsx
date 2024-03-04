'use client';

import { createArticle } from "@/backend/actions/article";
import { analyzeSources } from "@/backend/ai/analyze";
import { parseResponse } from "@/backend/ai/parse";
import { Source } from "@/types/source";
import { getNewsSite } from "@/utils/news";
import { Button, Input, Modal, ModalBody, ModalContent, Tooltip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import animations from "./animations.module.css";
import { getSourceIcon } from "@/backend/db/articles";
import { formatNumber } from "@/utils/format";
import Loading from "@/components/loading/loading";
import { getKeys } from "@/backend/keys";

export default function AnalyzeForm() {
    const [sources, setSources] = useState<Source[]>([]);
    const [analyzing, setAnalyzing] = useState(false);

    const [sourceUrl, setSourceUrl] = useState<string>("");
    const [loadingSources, setLoadingSources] = useState(false);

    const [numCharacters, setNumCharacters] = useState(0);
    const MAX_CHARACTERS = 75000;

    const [isPending, startTransition] = useTransition();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const analyzeForm = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const [keys, setKeys] = useState<{ gemini: string, cseId: string } | null>(null);

    async function synthesizeSources() {
        if (!keys) return;

        const analyzed = await analyzeSources(keys.gemini, sources);
        if (!analyzed.success || !analyzed.response) {
            toast.error("An error occurred while analyzing the sources");
            setAnalyzing(false);
            return;
        }

        const article = await parseResponse(sources, analyzed.response, keys.cseId);
        const articleId = await createArticle(article);
        router.push(`/articles/${articleId}`);
    }

    useEffect(() => {
        let total = 0;
        for (const source of sources) {
            const aiPrompt = "From " + source.source + " - " + source.content + "\n\n";
            total += aiPrompt.length;
        }

        setNumCharacters(total);
    }, [sources]);

    useEffect(() => {
        if (isPending || sources.length === 0) return;
        synthesizeSources();
    }, [isPending]);

    return (
        <div className="flex flex-col items-center mt-32">
            <h1 className="text-5xl font-bold">Analyze an Event</h1>
            <p className="text-lg text-center text-gray-500 w-[80vw] max-w-[700px] mt-4 mb-8">Contribute to the Based community by submitting multiple news sources on the same event to help clear up bias and misinformation.</p>

            <p className="mb-2 text-gray-500 text-sm">{formatNumber(numCharacters)} / {formatNumber(MAX_CHARACTERS)} characters used</p>
            <div className="border-2 border-gray-200 w-[90vw] max-w-[500px] h-[300px] rounded-2xl mb-8">
                {sources.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <span className="font-medium text-2xl text-gray-500">No sources added</span>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col p-2 overflow-y-scroll overflow-x-hidden">
                        {sources.map((source, index) => (
                            <div className="p-3 pb-4 grid grid-cols-[50px_1fr_50px] gap-4 w-[500px] border-b-2 border-gray-200 h-fit" key={index}>
                                <Image src={getSourceIcon(source.url)} alt="Fox News" width={50} height={50} className="rounded-xl" />
                                <div className="w-full overflow-hidden flex flex-col">
                                    <h1>{source.source}</h1>
                                    <Link href={source.url} target="_blank" className="text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">{source.url}</Link>
                                </div>
                                <div className={"w-[50px] h-[50px] flex items-center justify-center cursor-pointer " + animations.trash} onClick={() => {
                                    setSources(sources.filter((_, i) => i !== index));
                                }}>
                                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4/6 h-4/6">
                                        <path d="M20.5001 6H3.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M9.5 11L10 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M14.5 11L14 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#1C274C" strokeWidth="1.5" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <form action={async () => {
                startTransition(async () => {
                    setKeys(await getKeys() as any);
                });
            }} ref={analyzeForm} className="flex items-center gap-2">
                <Button className="font-medium text-lg py-6" startContent={
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                        <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                } onPress={onOpen}>Add Source</Button>
                <Button color="primary" className="font-medium text-lg py-6" isLoading={analyzing} onPress={() => {
                    setAnalyzing(true);
                    analyzeForm.current?.requestSubmit();
                }}>Analyze Story</Button>
            </form>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-6 py-10 flex flex-col items-center gap-0">
                                <h1 className="text-3xl font-bold mb-4">Add Source</h1>
                                <Input variant="faded" placeholder="https://news.com/article" className="w-5/6 mb-2" value={sourceUrl} onValueChange={setSourceUrl} />
                                <Button color="primary" className="w-5/6 font-medium py-4 mb-3" onPress={async () => {
                                    if (!sourceUrl) {
                                        toast.error("Please enter a valid URL");
                                        return;
                                    }

                                    for (const source of sources) {
                                        if (source.url === sourceUrl) {
                                            toast.error("This source has already been added");
                                            return;
                                        }
                                    }

                                    setLoadingSources(true);
                                    const contentRequest = await fetch('/api/read', {
                                        method: 'GET',
                                        headers: {
                                            source: sourceUrl
                                        }
                                    });

                                    if (!contentRequest.ok) {
                                        const error = await contentRequest.text();
                                        toast.error(error);
                                        setLoadingSources(false);
                                        return;
                                    }

                                    const content = await contentRequest.text();
                                    if (content.length + numCharacters > MAX_CHARACTERS) {
                                        toast.error("The total character count of all sources cannot exceed 75,000 characters");
                                        setLoadingSources(false);
                                        return;
                                    }

                                    setSources([...sources, {
                                        source: getNewsSite(sourceUrl),
                                        url: sourceUrl,
                                        content
                                    }]);
                                    setSourceUrl("");
                                    setLoadingSources(false);
                                    onClose();
                                }} isLoading={loadingSources}>Add Source</Button>
                                <p className="text-gray-500 text-sm">Take a look at our <Tooltip placement="bottom" content={(
                                    <div className="p-1">
                                        Fox News<br />
                                        CNN<br />
                                        NBC<br />
                                        BBC<br />
                                        NPR<br />
                                        Washington Post<br />
                                        CBS<br />
                                    </div>
                                )}><span className="text-blue-500 cursor-pointer">supported news sites</span></Tooltip></p>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {analyzing && (
                <Loading />
            )}
        </div>
    )
}