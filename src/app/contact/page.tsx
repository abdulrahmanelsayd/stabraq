import ContactView from '@/components/contact/ContactView'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us | STABRAQ',
    description: 'Get in touch with Stabraq team for inquiries, support, or feedback.',
}

export default function ContactPage() {
    return <ContactView />
}
