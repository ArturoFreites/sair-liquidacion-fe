// src/components/ErrorModal.tsx
import { useEffect } from 'react';
import { useErrorModalStore } from '../store/errorModalStore';
import AlertIcon from './icons/AlertIcon';

export default function ErrorModal() {
	const { isVisible, message, type, redirectToLogin, hideError } = useErrorModalStore();

	// ⏲️ Autocierre a los 5 segundos
	useEffect(() => {
		if (isVisible) {
			const timeout = setTimeout(() => {
				hideError();
				if (redirectToLogin) {
					window.location.href = '/login';
				}
			}, 5000);

			return () => clearTimeout(timeout);
		}
	}, [isVisible, hideError, redirectToLogin]);

	if (!isVisible) return null;

	const typeStyles = {
		ok: { icon: 'fill-green-600' },
		error: { icon: 'fill-red-600' },
		caution: { icon: 'fill-yellow-600' },
	}[type] ?? { icon: 'fill-gray-500' };

	return (
		<div className="fixed inset-0 flex items-end justify-end z-50 px-10 py-10 bg-transparent pointer-events-none">
			<div
				className="flex items-center rounded-lg shadow-lg py-2 px-4 max-w-md bg-white pointer-events-auto"
				role="alert"
			>
				<div className="pr-3">
					<AlertIcon className={typeStyles.icon} width={20} height={20} />
				</div>
				<div>
					<h2 className="text-sm font-semibold">Notificación</h2>
					<p className="text-xs break-words max-w-xs">{message}</p>
				</div>
			</div>
		</div>
	);
}
