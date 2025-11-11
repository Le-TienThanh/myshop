import { cn } from '@/lib/utils';
import React from 'react'

interface Props {
    amount: number | undefined,
    className?: string,

}

const PriceFormatter = ({amount, className} : Props) => {
    const formattedPrice = new Number(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
  return (
    <span className={cn('text-sm font-semibold text-darkColor', className)} >
        {formattedPrice}
    </span>
  )
}

export default PriceFormatter