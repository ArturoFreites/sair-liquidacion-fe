
type Props = {
    label:string,
    placeHolder:string,
    type:string,
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({label,placeHolder,type,value,onChange}:Props) {
    return (
        <div className='my-2 mx-6 xl:m-5'>
            <p className='mb-3 text-sm'>
                {label}
            </p>
            <input 
                placeholder={placeHolder} 
                type={type} 
                value={value} 
                onChange={onChange}
                className={`w-full bg-neutral-200 p-2 xl:p-3 rounded-md text-sm`}
            />
        </div>
    );
}