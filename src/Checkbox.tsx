type Props = {
    option: string;
    checked: boolean;
    onChange: () => void;
};

function Checkbox({ option, checked, onChange }: Props) {
    return (
        <div className="w-full m-5">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id={option}
                    checked={checked}
                    onChange={onChange}
                    className="accent-blue-800"
                />
                <label htmlFor={option}>{option}</label>
            </div>
        </div>
    );
}

export default Checkbox;
