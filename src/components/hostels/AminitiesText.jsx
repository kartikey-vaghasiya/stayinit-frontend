export default function AminitesText(props) {

    const inputStyleClass = "py-2 px-4 focus:outline-none placeholder:text-[#073937] focus:placeholder-[#FFFBF2] focus:bg-[#073937] focus:text-[#D8D4CD] bg-colorY2 rounded-[3rem] border border-[#D8D4CD]"

    return (
        <div className={inputStyleClass}>
            <div className="flex flex-row justify-center items-center gap-6">
                <img src={`/icons/${props.url}`} className="w-6" alt="" /><span>{props.name}</span>
            </div>
        </div>
    )
}