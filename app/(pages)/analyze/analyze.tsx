'use client';

import { createArticle } from "@/backend/actions/article";
import { analyzeSources } from "@/backend/ai/analyze";
import { parseResponse } from "@/backend/ai/parse";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AnalyzeForm() {
    const router = useRouter();

    return (
        <form action={async (data: FormData) => {
            const sources = [
                {
                    source: 'Fox News',
                    content: 'The U.S. delivered its first air drop of aid supplies to Gaza on Saturday, with President Bidens administration saying it would be a "sustained effort" to bring more food and other aid. The first of the airdrops landed in Gaza on Saturday, delivering some 38,000 MREs, or meals ready-to-eat. National Security Council spokesman John Kirby says drops will continue throughout the coming weeks in partnership with Jordan and other allies. "We need to do more and the United States will do more," Biden told reporters on Friday. "Aid flowing to Gaza is nowhere nearly enough." The U.S. is also considering the delivery of aid by U.S. navy vessels in the Mediterranean Sea along the coast of Gaza.',
                    url: 'https://www.foxnews.com/politics/biden-confirms-plans-airdrop-aid-gaza-stampede-kills-100'
                },
                {
                    source: 'CNN',
                    content: 'The United States and Jordan air-dropped humanitarian aid into Gaza, US Central Command said Saturday, one day after President Joe Biden asserted the US would pull out “every stop” to get more aid into the besieged coastal enclave. The combined operation by the US Air Force and the Royal Jordanian Air Force saw US C-130 aircraft dropping 38,000 meals along the Gaza coastline, CENTCOM said in a statement.There were 66 total bundles dropped – 22 from each of three aircraft, a US official said. There was no water or medical supplies in the bundles. CENTCOM said it was “conducting planning for potential follow-on airborne aid delivery missions.” “These airdrops are part of a sustained effort to get more aid into Gaza, including by expanding the flow of aid through land corridors and routes,” the statement continued. On Friday, Biden bemoaned the slow pace of assistance into Gaza while announcing the upcoming airdrops. Speaking alongside Italian Prime Minister Giorgia Meloni in the Oval Office, Biden also said the US was working to broker a ceasefire that would allow for additional aid. Biden said he would “insist” that Israel allow more trucks and routes for aid into Gaza. “We’re going to insist that Israel facilitate more trucks and more routes to get more and more people the help they need, no excuses,” Biden said. “Innocent lives are on the line, and children’s lives are on the line.” Other countries, including the United Arab Emirates and France, have air-dropped aid into Gaza. But Saturday’s operation was a first for the US. Prior to the announcement of Saturday’s operation, several aid agencies criticized the US plans to drop food aid as ineffective, as the United Nations warns that hundreds of thousands of Gazans are on the brink of famine.',
                    url: 'https://www.cnn.com/2024/03/02/politics/us-airdrops-aid-gaza/index.html'
                }
            ];
            const analyzed = await analyzeSources(sources);
            const article = parseResponse(sources, analyzed);
            const articleId = await createArticle(article);
            router.push(`/article/${articleId}`);
        }}>
            <Button color="primary" className="font-medium text-base py-[22px]" type="submit">Analyze Story</Button>
        </form>
    )
}