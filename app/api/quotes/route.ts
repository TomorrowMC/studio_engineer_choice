import { NextRequest, NextResponse } from 'next/server'

const QUOTES = {
  0: {
    shop: 'AutoCare Service Center',
    date: 'April 21, 2026',
    vehicle: '2018 Toyota Camry',
    mileage: '68,750 mi',
    taxRate: 0.08,
    potentialSavings: 80,
    items: [
      { id: 1, name: 'Brake Pad Replacement (Front)', originalPrice: 250, marketPrice: 195, marketRange: '180–220', status: 'High', color: 'red' },
      { id: 2, name: 'Engine Oil Change', originalPrice: 80, marketPrice: 55, marketRange: '38–80', status: 'High', color: 'yellow' },
      { id: 3, name: 'Air Filter Replacement', originalPrice: 40, marketPrice: 22, marketRange: '17–55', status: 'High', color: 'yellow' },
      { id: 4, name: 'Labor (3 hrs)', originalPrice: 270, marketPrice: 270, marketRange: '240–300', status: 'Fair', color: 'green' },
    ],
  },
  1: {
    shop: 'XYZ Auto Service',
    date: 'April 23, 2024',
    vehicle: '2019 Honda Accord',
    mileage: '87,450 mi',
    taxRate: 0.0825,
    potentialSavings: 95,
    items: [
      { id: 1, name: 'Replace Serpentine Belt', originalPrice: 125, marketPrice: 90, marketRange: '85–110', status: 'High', color: 'red' },
      { id: 2, name: 'Rotate & Balance Tires', originalPrice: 60, marketPrice: 60, marketRange: '55–70', status: 'Fair', color: 'green' },
      { id: 3, name: 'Replace Battery', originalPrice: 180, marketPrice: 145, marketRange: '130–160', status: 'High', color: 'yellow' },
      { id: 4, name: 'Replace Cabin Air Filter', originalPrice: 45, marketPrice: 22, marketRange: '17–55', status: 'High', color: 'red' },
    ],
  },
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  if (id !== null) {
    const idx = parseInt(id)
    const quote = QUOTES[idx as keyof typeof QUOTES]
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }
    return NextResponse.json({ id: idx, ...quote })
  }

  return NextResponse.json(
    Object.entries(QUOTES).map(([key, val]) => ({ id: parseInt(key), ...val }))
  )
}
