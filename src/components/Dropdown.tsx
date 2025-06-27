// components/Dropdown.tsx
import React from 'react';

/* ---------- Tipos ---------- */
export interface DropdownProps<
    TData,
    TValue extends string | number = string | number
> {
    label: string;
    options: TData[];
    /** Valor actualmente seleccionado (id, código, etc.) */
    value: TValue | null;
    /** Te devuelve el `value` y el objeto completo seleccionado */
    onChange: (value: TValue, option: TData | undefined) => void;
    /** Cómo obtienes la clave/valor único de cada opción (ej. `o.id`) */
    getOptionValue: (option: TData) => TValue;
    /** Qué texto se muestra al usuario (ej. `o.name`) */
    getOptionLabel: (option: TData) => string;
    /** Texto gris cuando no hay selección */
    placeholder?: string;
}

export function Dropdown<TData, TValue extends string | number = string>({
    label,
    options,
    value,
    onChange,
    getOptionLabel,
    getOptionValue,
    placeholder = 'Seleccione…',
}: DropdownProps<TData, TValue>) {
    /* Handler controlado */
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value as unknown as TValue;
        const option = options.find(
            (o) => getOptionValue(o).toString() === newValue.toString(),
        );
        onChange(newValue, option);
    };

    return (
        <div className="m-5">
            <p className="mb-1 text-sm">{label}</p>
            <select
                className="w-3/4  rounded-md px-3 p-3 text-sm bg-neutral-200 border-0"
                value={value ?? ''}
                onChange={handleChange}
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>

                {options.map((o) => {
                    const optValue = getOptionValue(o);
                    return (
                        <option key={optValue.toString()} value={optValue}>
                            {getOptionLabel(o)}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}