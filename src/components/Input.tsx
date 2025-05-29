
type Props = {
    label:string,
    placeHolder:string,
    type:string,
    value: string;
    className: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({label,placeHolder,type,value,onChange, className}:Props) {
    return (
        <div className='m-5'>
            <p className='mb-3 text-sm'>
                {label}
            </p>
            <input 
                placeholder={placeHolder} 
                type={type} 
                value={value} 
                onChange={onChange}
                className={`w-60 bg-neutral-200 p-3 rounded-md text-sm ${className}`}
            />
        </div>
    );
}