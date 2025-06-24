import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Plane, Search, Calendar, Users, ArrowLeftRight, MapPin, Clock, Filter, SortAsc } from 'lucide-react'
import './App.css'

function App() {
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'round-trip'
  })
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('price')
  const [filterBy, setFilterBy] = useState('all')

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const searchMockFlights = async () => {
    setLoading(true)
    try {
      // For demonstration purposes, we'll use mock data
      // In a real implementation, this would call the Sky-Scrapper API
      // Example API call would look like:
      
      // const response = await fetch('https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights', {
      //   method: 'GET',
      //   headers: {
      //     'X-RapidAPI-Key': '5ed2255f07msh2d29c36e71e379f1fac3ejsn9f4a6f94e416',
      //     'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
      //   },
      //   params: {
      //     originSkyId: searchData.origin,
      //     destinationSkyId: searchData.destination,
      //     originEntityId: searchData.origin,
      //     destinationEntityId: searchData.destination,
      //     date: searchData.departureDate,
      //     returnDate: searchData.returnDate,
      //     cabinClass: 'economy',
      //     adults: searchData.passengers,
      //     sortBy: 'best',
      //     currency: 'USD',
      //     market: 'en-US',
      //     countryCode: 'US'
      //   }
      // })
      // const data = await response.json()
      // setFlights(data.data.itineraries)
      
      
      setTimeout(() => {
        const mockFlights = [
          {
            id: 1,
            airline: 'American Airlines',
            flightNumber: 'AA 1234',
            departure: '08:00',
            arrival: '12:30',
            duration: '4h 30m',
            price: 299,
            stops: 'Nonstop',
            aircraft: 'Boeing 737',
            departureAirport: 'JFK',
            arrivalAirport: 'LAX',
            rating: 4.2,
            emissions: 'Low'
          },
          {
            id: 2,
            airline: 'Delta',
            flightNumber: 'DL 5678',
            departure: '14:15',
            arrival: '18:45',
            duration: '4h 30m',
            price: 325,
            stops: 'Nonstop',
            aircraft: 'Airbus A320',
            departureAirport: 'LGA',
            arrivalAirport: 'LAX',
            rating: 4.5,
            emissions: 'Low'
          },
          {
            id: 3,
            airline: 'United',
            flightNumber: 'UA 9012',
            departure: '19:30',
            arrival: '00:15+1',
            duration: '4h 45m',
            price: 275,
            stops: '1 stop',
            aircraft: 'Boeing 757',
            departureAirport: 'EWR',
            arrivalAirport: 'LAX',
            rating: 4.0,
            emissions: 'Medium'
          },
          {
            id: 4,
            airline: 'JetBlue',
            flightNumber: 'B6 3456',
            departure: '06:45',
            arrival: '11:15',
            duration: '4h 30m',
            price: 289,
            stops: 'Nonstop',
            aircraft: 'Airbus A321',
            departureAirport: 'JFK',
            arrivalAirport: 'LAX',
            rating: 4.3,
            emissions: 'Low'
          },
          {
            id: 5,
            airline: 'Southwest',
            flightNumber: 'WN 7890',
            departure: '16:20',
            arrival: '21:10',
            duration: '4h 50m',
            price: 259,
            stops: 'Nonstop',
            aircraft: 'Boeing 737',
            departureAirport: 'LGA',
            arrivalAirport: 'LAX',
            rating: 4.1,
            emissions: 'Low'
          }
        ]
        setFlights(mockFlights)
        setLoading(false)
      }, 2000)
    } catch (error) {
      console.error('Error searching flights:', error)
      setLoading(false)
    }
  }
  const searchFlights = async () => {
  setLoading(true)
  try {
    console.log(searchData.origin)
    console.log(searchData.destination)
    const queryParams = new URLSearchParams({
      originSkyId: searchData.origin,
      destinationSkyId: searchData.destination,
      // originEntityId: searchData.origin,
      // destinationEntityId: searchData.destination,
      date: searchData.departureDate,
      returnDate: searchData.returnDate,
      cabinClass: 'economy',
      adults: searchData.passengers,
      sortBy: 'best',
      currency: 'USD',
      market: 'en-US',
      countryCode: 'US'
    }).toString()

  const response = await fetch(`http://localhost:5000/api/search-flights?${queryParams}`);



    const data = await response.json()

    if (data?.data?.itineraries) {
      setFlights(data.data.itineraries)
    } else {
      console.warn('No itineraries found in API response:', data)
      setFlights([])
    }

  } catch (error) {
    console.error('Error searching flights:', error)
    setFlights([])
  } finally {
    setLoading(false)
  }
}

  const sortedAndFilteredFlights = flights
    .filter(flight => {
      if (filterBy === 'all') return true
      if (filterBy === 'nonstop') return flight.stops === 'Nonstop'
      if (filterBy === 'stops') return flight.stops !== 'Nonstop'
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'duration') return a.duration.localeCompare(b.duration)
      if (sortBy === 'departure') return a.departure.localeCompare(b.departure)
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Google Flights Clone
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <span>Powered by Sky-Scrapper API</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <Search className="h-6 w-6" />
              <span>Search Flights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* Origin */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin className="h-4 w-4 mr-1" />
                  From
                </label>
                <Input
                  placeholder="Origin city or airport"
                  value={searchData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin className="h-4 w-4 mr-1" />
                  To
                </label>
                <Input
                  placeholder="Destination city or airport"
                  value={searchData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Departure Date */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4 mr-1" />
                  Departure
                </label>
                <Input
                  type="date"
                  value={searchData.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Return Date */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4 mr-1" />
                  Return
                </label>
                <Input
                  type="date"
                  value={searchData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  disabled={searchData.tripType === 'one-way'}
                  className="border-2 border-gray-200 focus:border-blue-500 transition-colors disabled:bg-gray-100"
                />
              </div>

              {/* Passengers */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Users className="h-4 w-4 mr-1" />
                  Passengers
                </label>
                <Input
                  type="number"
                  min="1"
                  max="9"
                  value={searchData.passengers}
                  onChange={(e) => handleInputChange('passengers', parseInt(e.target.value))}
                  className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Trip Type */}
            <div className="flex space-x-6 mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="round-trip"
                  checked={searchData.tripType === 'round-trip'}
                  onChange={(e) => handleInputChange('tripType', e.target.value)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Round trip</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value="one-way"
                  checked={searchData.tripType === 'one-way'}
                  onChange={(e) => handleInputChange('tripType', e.target.value)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">One way</span>
              </label>
            </div>

            {/* Search Button */}
            <Button 
              onClick={searchFlights}
              disabled={loading || !searchData.origin || !searchData.destination || !searchData.departureDate}
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Search Flights</span>
                </div>
              )}
            </Button> 
            {/* Search Button mock data */}
            <Button 
              onClick={searchMockFlights}
              disabled={loading || !searchData.origin || !searchData.destination || !searchData.departureDate}
              className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 ml-2 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Mock data Search Flights</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Flight Results */}
        {flights.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <h2 className="text-3xl font-bold text-gray-900">Flight Results</h2>
              
              {/* Filters and Sort */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All flights</SelectItem>
                      <SelectItem value="nonstop">Nonstop</SelectItem>
                      <SelectItem value="stops">With stops</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <SortAsc className="h-4 w-4 text-gray-500" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                      <SelectItem value="departure">Departure</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              {sortedAndFilteredFlights.length} flights found
            </div>
            
            <div className="grid gap-4">
              {sortedAndFilteredFlights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      {/* Flight Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Plane className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-bold text-lg text-gray-900">{flight.airline}</div>
                              <div className="text-sm text-gray-500">{flight.flightNumber} • {flight.aircraft}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={flight.stops === 'Nonstop' ? 'default' : 'secondary'}>
                              {flight.stops}
                            </Badge>
                            <Badge variant={flight.emissions === 'Low' ? 'default' : 'secondary'}>
                              {flight.emissions} emissions
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-gray-600">
                          <div className="flex items-center space-x-3">
                            <div className="text-center">
                              <div className="font-bold text-xl text-gray-900">{flight.departure}</div>
                              <div className="text-sm">{flight.departureAirport}</div>
                            </div>
                            <div className="flex flex-col items-center space-y-1">
                              <ArrowLeftRight className="h-4 w-4 text-gray-400" />
                              <div className="text-xs text-gray-500">{flight.duration}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-xl text-gray-900">{flight.arrival}</div>
                              <div className="text-sm">{flight.arrivalAirport}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <span>⭐</span>
                            <span>{flight.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>On-time: 85%</span>
                          </div>
                        </div>
                      </div>

                      {/* Price and Select */}
                      <div className="flex items-center justify-between lg:flex-col lg:items-end lg:space-y-3">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600">${flight.price}</div>
                          <div className="text-sm text-gray-500">per person</div>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                          Select Flight
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-6 text-xl text-gray-600 font-medium">Searching for the best flights...</p>
            <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && flights.length === 0 && searchData.origin && searchData.destination && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Plane className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to search!</h3>
            <p className="text-gray-600">Click "Search Flights" to find the best deals for your trip.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

