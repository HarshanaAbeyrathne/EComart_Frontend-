import React from 'react'
import Navbar from '../components/Navbar'
import DisplayItems from '../components/ItemDisplay'
import Footer from '../components/Footer'

function Buy() {
  return (
    <div>
    <Navbar />
    <div className="container mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-4 text-center bg-green-100">Purchase Items</h1>
        <DisplayItems />
    </div>
    <Footer />
</div>
  )
}

export default Buy