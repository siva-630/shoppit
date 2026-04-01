import React from 'react'
import {
  Bath,
  Crown,
  Droplets,
  Eye,
  Gift,
  Heart,
  Palette,
  Pill,
  Ribbon,
  Scissors,
  Shield,
  Smile,
  Sparkles,
  SprayCan,
  Star,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const iconMap = {
  bath: Bath,
  crown: Crown,
  droplets: Droplets,
  eye: Eye,
  gift: Gift,
  heart: Heart,
  palette: Palette,
  pill: Pill,
  ribbon: Ribbon,
  scissors: Scissors,
  shield: Shield,
  smile: Smile,
  sparkles: Sparkles,
  spray: SprayCan,
  star: Star,
}

const BeautyMiniCards = ({ items = [], isLoading = false, errorMessage = '' }) => {
  const navigate = useNavigate()
  if (isLoading) {
    return (
      <section className='rounded-2xl border border-pink-200 bg-white p-4 shadow-sm'>
        <p className='text-sm font-medium text-slate-600'>Loading beauty categories...</p>
      </section>
    )
  }

  if (errorMessage) {
    return (
      <section className='rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm'>
        <p className='text-sm font-medium text-red-600'>{errorMessage}</p>
      </section>
    )
  }

  if (!items.length) {
    return null
  }

  return (
    <section className='rounded-3xl border border-pink-200 bg-white p-4 shadow-sm'>
      <div className='no-scrollbar overflow-x-auto'>
        <div className='grid grid-flow-col grid-rows-2 auto-cols-[130px] gap-3 sm:auto-cols-[140px]'>
          {items.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles

            return (
              <article
                key={item.id}
                className='group cursor-pointer text-center'
                role='button'
                tabIndex={0}
                onClick={() => item.productId && navigate(`/product/${item.productId}`)}
                onKeyDown={(event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && item.productId) {
                    event.preventDefault()
                    navigate(`/product/${item.productId}`)
                  }
                }}
              >
                <div className='relative overflow-hidden rounded-2xl bg-pink-100 ring-1 ring-pink-200'>
                  <img
                    src={item.image}
                    alt={item.alt || item.label}
                    className='h-26 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-28'
                    loading='lazy'
                  />
                  <span className='absolute left-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-pink-600 shadow-sm'>
                    <Icon className='h-4 w-4' />
                  </span>
                </div>
                <p className='mt-2 line-clamp-1 text-sm font-semibold text-slate-800'>{item.label}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BeautyMiniCards
