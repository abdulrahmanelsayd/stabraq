import CheckoutView from '@/components/checkout/CheckoutView'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Checkout | STABRAQ',
    description: 'Secure checkout for your Stabraq order.',
}

export default function CheckoutPage() {
    return <CheckoutView />
}
