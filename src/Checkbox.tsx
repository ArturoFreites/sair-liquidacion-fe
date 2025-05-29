type Props = {
    option: string
}

function Checkbox({ option }: Props) {
    return (
        <div className="w-full m-5">
            <p className="mb-3 text-sm" ></p>
            <div className="flex items-center">
                <input type="checkbox" id="option" checked />
                <label>{option}</label>
            </div>
        </div>
    );
}

export default Checkbox;