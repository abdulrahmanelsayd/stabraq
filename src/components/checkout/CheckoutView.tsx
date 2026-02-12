'use client'

import { useState, useMemo } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import PageShell from '@/components/layout/PageShell'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import {
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Truck,
    CreditCard,
    Check,
    ArrowLeft,
    Lock,
} from 'lucide-react'

type Step = 'shipping' | 'payment' | 'review'

const STEPS: { key: Step; label: string; icon: React.ElementType }[] = [
    { key: 'shipping', label: 'Shipping', icon: Truck },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'review', label: 'Review', icon: ShieldCheck },
]

export default function CheckoutView() {
    const router = useRouter()
    const { items, clearCart } = useCartStore()
    const [step, setStep] = useState<Step>('shipping')
    const [orderPlaced, setOrderPlaced] = useState(false)

    // Form state
    const [shipping, setShipping] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        governorate: '',
        notes: '',
    })

    const [payment, setPayment] = useState({
        method: 'cod' as 'cod' | 'card',
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
    })

    const total = useMemo(() => items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0), [items])
    const shippingCost = useMemo(() => (total >= 2000 ? 0 : 60), [total])
    const currentStepIdx = STEPS.findIndex((s) => s.key === step)

    const canProceed = () => {
        if (step === 'shipping') {
            return (
                shipping.firstName &&
                shipping.lastName &&
                shipping.email &&
                shipping.phone &&
                shipping.address &&
                shipping.city &&
                shipping.governorate
            )
        }
        if (step === 'payment') {
            if (payment.method === 'cod') return true
            return payment.cardNumber && payment.cardName && payment.expiry && payment.cvv
        }
        return true
    }

    const handleNext = () => {
        const idx = currentStepIdx
        if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].key)
    }

    const handleBack = () => {
        const idx = currentStepIdx
        if (idx > 0) setStep(STEPS[idx - 1].key)
    }

    const handlePlaceOrder = () => {
        setOrderPlaced(true)
        clearCart()
    }

    if (items.length === 0 && !orderPlaced) {
        return (
            <PageShell>
                <section className="py-32 text-center px-4">
                    <h1 className="text-3xl font-display text-luxury-black mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-500 mb-8">Add items to your cart before checking out.</p>
                    <Link
                        href="/collections"
                        className="inline-flex items-center gap-2 bg-luxury-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Browse Collections
                    </Link>
                </section>
            </PageShell>
        )
    }

    if (orderPlaced) {
        return (
            <PageShell>
                <section className="py-32 text-center px-4">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-display text-luxury-black mb-4">Order Placed!</h1>
                    <p className="text-gray-500 max-w-md mx-auto mb-3">
                        Thank you for your order. You&apos;ll receive a confirmation email shortly.
                    </p>
                    <p className="text-xs text-gray-400 mb-10">Order #STQ-{Date.now().toString(36).toUpperCase()}</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-luxury-black text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </section>
            </PageShell>
        )
    }

    return (
        <PageShell>
            <section className="py-12 md:py-20 px-4 md:px-8">
                <div className="max-w-[1200px] mx-auto">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 md:mb-16">
                        {STEPS.map((s, i) => (
                            <div key={s.key} className="flex items-center gap-2 md:gap-4">
                                <button
                                    onClick={() => i < currentStepIdx && setStep(s.key)}
                                    className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${s.key === step
                                        ? 'bg-luxury-black text-white shadow-lg'
                                        : i < currentStepIdx
                                            ? 'bg-green-50 text-green-700 cursor-pointer hover:bg-green-100'
                                            : 'bg-gray-100 text-gray-400'
                                        }`}
                                >
                                    {i < currentStepIdx ? (
                                        <Check className="w-3.5 h-3.5" />
                                    ) : (
                                        <s.icon className="w-3.5 h-3.5" />
                                    )}
                                    <span className="hidden md:inline">{s.label}</span>
                                </button>
                                {i < STEPS.length - 1 && (
                                    <ChevronRight className="w-4 h-4 text-gray-300" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Form Area */}
                        <div className="lg:col-span-3">
                            {/* SHIPPING */}
                            {step === 'shipping' && (
                                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/5">
                                    <h2 className="text-2xl font-display text-luxury-black mb-8 tracking-tight">
                                        Shipping Details
                                    </h2>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <InputField
                                                label="First Name"
                                                value={shipping.firstName}
                                                onChange={(v) => setShipping({ ...shipping, firstName: v })}
                                                required
                                            />
                                            <InputField
                                                label="Last Name"
                                                value={shipping.lastName}
                                                onChange={(v) => setShipping({ ...shipping, lastName: v })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <InputField
                                                label="Email"
                                                type="email"
                                                value={shipping.email}
                                                onChange={(v) => setShipping({ ...shipping, email: v })}
                                                required
                                            />
                                            <InputField
                                                label="Phone"
                                                type="tel"
                                                value={shipping.phone}
                                                onChange={(v) => setShipping({ ...shipping, phone: v })}
                                                required
                                            />
                                        </div>
                                        <InputField
                                            label="Street Address"
                                            value={shipping.address}
                                            onChange={(v) => setShipping({ ...shipping, address: v })}
                                            required
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <InputField
                                                label="City"
                                                value={shipping.city}
                                                onChange={(v) => setShipping({ ...shipping, city: v })}
                                                required
                                            />
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                                    Governorate *
                                                </label>
                                                <select
                                                    value={shipping.governorate}
                                                    onChange={(e) => setShipping({ ...shipping, governorate: e.target.value })}
                                                    className="w-full bg-gray-50 rounded-xl py-3.5 px-5 text-sm outline-none border border-transparent focus:border-luxury-black/10 focus:ring-2 focus:ring-luxury-black/10 transition-all"
                                                >
                                                    <option value="">Select</option>
                                                    {['Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Sharqia', 'Gharbia', 'Qalyubia', 'Beheira', 'Fayoum', 'Minya', 'Assiut', 'Sohag', 'Luxor', 'Aswan', 'Red Sea', 'Suez', 'Ismailia', 'Port Said'].map((g) => (
                                                        <option key={g} value={g}>{g}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <InputField
                                            label="Order Notes (optional)"
                                            value={shipping.notes}
                                            onChange={(v) => setShipping({ ...shipping, notes: v })}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* PAYMENT */}
                            {step === 'payment' && (
                                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/5">
                                    <h2 className="text-2xl font-display text-luxury-black mb-8 tracking-tight">
                                        Payment Method
                                    </h2>
                                    <div className="space-y-4 mb-8">
                                        {[
                                            { key: 'cod' as const, label: 'Cash on Delivery', desc: 'Pay when you receive your order' },
                                            { key: 'card' as const, label: 'Credit / Debit Card', desc: 'Visa, Mastercard, Meeza' },
                                        ].map((m) => (
                                            <button
                                                key={m.key}
                                                onClick={() => setPayment({ ...payment, method: m.key })}
                                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${payment.method === m.key
                                                    ? 'border-luxury-black bg-luxury-black/[0.02]'
                                                    : 'border-gray-100 hover:border-gray-200'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payment.method === m.key ? 'border-luxury-black' : 'border-gray-300'
                                                        }`}>
                                                        {payment.method === m.key && (
                                                            <div className="w-2.5 h-2.5 rounded-full bg-luxury-black" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-luxury-black block">{m.label}</span>
                                                        <span className="text-xs text-gray-400">{m.desc}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {payment.method === 'card' && (
                                        <div className="space-y-5 pt-4 border-t border-gray-100">
                                            <InputField
                                                label="Card Number"
                                                value={payment.cardNumber}
                                                onChange={(v) => setPayment({ ...payment, cardNumber: v })}
                                                placeholder="1234 5678 9012 3456"
                                                required
                                            />
                                            <InputField
                                                label="Name on Card"
                                                value={payment.cardName}
                                                onChange={(v) => setPayment({ ...payment, cardName: v })}
                                                required
                                            />
                                            <div className="grid grid-cols-2 gap-5">
                                                <InputField
                                                    label="Expiry Date"
                                                    value={payment.expiry}
                                                    onChange={(v) => setPayment({ ...payment, expiry: v })}
                                                    placeholder="MM/YY"
                                                    required
                                                />
                                                <InputField
                                                    label="CVV"
                                                    value={payment.cvv}
                                                    onChange={(v) => setPayment({ ...payment, cvv: v })}
                                                    placeholder="123"
                                                    required
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                                                <Lock className="w-3 h-3" />
                                                <span>Your payment information is encrypted and secure.</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* REVIEW */}
                            {step === 'review' && (
                                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/5">
                                    <h2 className="text-2xl font-display text-luxury-black mb-8 tracking-tight">
                                        Order Review
                                    </h2>

                                    {/* Shipping summary */}
                                    <div className="mb-8 p-5 bg-gray-50 rounded-2xl">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Ship To</h3>
                                            <button
                                                onClick={() => setStep('shipping')}
                                                className="text-xs text-luxury-black underline"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <p className="text-sm text-luxury-black">
                                            {shipping.firstName} {shipping.lastName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {shipping.address}, {shipping.city}, {shipping.governorate}
                                        </p>
                                        <p className="text-sm text-gray-500">{shipping.phone}</p>
                                    </div>

                                    {/* Payment summary */}
                                    <div className="mb-8 p-5 bg-gray-50 rounded-2xl">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Payment</h3>
                                            <button
                                                onClick={() => setStep('payment')}
                                                className="text-xs text-luxury-black underline"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <p className="text-sm text-luxury-black">
                                            {payment.method === 'cod'
                                                ? 'Cash on Delivery'
                                                : `Card ending in ${payment.cardNumber.slice(-4)}`}
                                        </p>
                                    </div>

                                    {/* Items */}
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                                            Items ({items.length})
                                        </h3>
                                        <div className="space-y-4">
                                            {items.map((item) => (
                                                <div
                                                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                                                    className="flex gap-4 items-center"
                                                >
                                                    <div className="w-16 h-20 relative rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            sizes="64px"
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-luxury-black truncate">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {item.selectedSize} · Qty: {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm font-medium text-luxury-black">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                {currentStepIdx > 0 ? (
                                    <button
                                        onClick={handleBack}
                                        className="flex items-center gap-2 text-sm text-luxury-black hover:underline"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                ) : (
                                    <Link
                                        href="/collections"
                                        className="flex items-center gap-2 text-sm text-luxury-black hover:underline"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Continue Shopping
                                    </Link>
                                )}

                                {step === 'review' ? (
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="bg-luxury-black text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <ShieldCheck className="w-4 h-4" /> Place Order
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        disabled={!canProceed()}
                                        className="bg-luxury-black text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        Continue <ChevronRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 sticky top-32">
                                <h3 className="text-lg font-display text-luxury-black mb-6 tracking-tight">
                                    Order Summary
                                </h3>

                                {/* Mini cart items */}
                                <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto scrollbar-hide">
                                    {items.map((item) => (
                                        <div
                                            key={`${item.id}-${item.selectedSize}`}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-12 h-14 relative rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    sizes="48px"
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium truncate">{item.name}</p>
                                                <p className="text-[10px] text-gray-400">x{item.quantity}</p>
                                            </div>
                                            <p className="text-xs font-medium">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="h-[1px] bg-black/5 mb-4" />

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Shipping</span>
                                        <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                                    </div>
                                    <div className="h-[1px] bg-black/5" />
                                    <div className="flex justify-between font-bold text-luxury-black text-base">
                                        <span>Total</span>
                                        <span>{formatPrice(total + shippingCost)}</span>
                                    </div>
                                </div>

                                {shippingCost === 0 && (
                                    <div className="mt-4 p-3 bg-green-50 rounded-xl text-xs text-green-700 text-center">
                                        ✓ You qualify for free shipping!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    )
}

/** Reusable input field */
function InputField({
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    required,
}: {
    label: string
    value: string
    onChange: (v: string) => void
    type?: string
    placeholder?: string
    required?: boolean
}) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {label} {required && '*'}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full bg-gray-50 rounded-xl py-3.5 px-5 text-sm outline-none border border-transparent focus:border-luxury-black/10 focus:ring-2 focus:ring-luxury-black/10 transition-all"
            />
        </div>
    )
}
