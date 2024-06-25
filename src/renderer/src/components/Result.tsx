import { data } from "@renderer/mock/result"
import { useState } from "react"

export default function Result(): JSX.Element {
    const [results, setResults] = useState([...data])

    return (
        <div className={"w-full p-3 bg-white rounded-sm text-slate-700 text-base"}>
            {
                results && results.map(item => {
                    return <div className={"w-full leading-loose flex flex-row justify-start gap-x-1 cursor-pointer"}>
                        <div>
                            {item.id + "."}
                        </div>
                        <div className={"truncate"}>
                            {item.content}
                        </div>
                    </div>
                })
            }
        </div>

    )
}
