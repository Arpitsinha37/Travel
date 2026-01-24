import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Aarav Sharma",
            role: "Traveler from Kathmandu",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80",
            text: "New Road Travels made my trip to Pokhara absolutely seamless. The sofa bus was incredibly comfortable, and the staff was very professional. Highly recommended!"
        },
        {
            name: "Sarah Jenkins",
            role: "Tourist from UK",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
            text: "I was worried about the long bus journey, but the VIP Sofa bus was a game changer. Smooth ride, AC working perfectly, and safe driving. Will use again."
        },
        {
            name: "Rajesh KC",
            role: "Business Traveler",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
            text: "Regularly travel between Kathmandu and Chitwan. Their punctuality is what keeps me coming back. Best bus service in Nepal hands down."
        },
        {
            name: "Priya Adhikari",
            role: "Student",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
            text: "Affordable prices for students and very safe for solo female travelers. The 'Booking for Women' feature is a thoughtful touch."
        },
        {
            name: "David Chen",
            role: "Adventure Seeker",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
            text: "Used their rental service for a jeep to Mustang. The vehicle was in top condition and the driver was an excellent guide too!"
        },
        {
            name: "Sunita Tamang",
            role: "Family Trip",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
            text: "Booked a Toyota Hiace for our family pilgrimage to Lumbini. Clean, spacious, and hassle-free. Thank you New Road Travels!"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            {/* Header */}
            <div className="bg-nepal-red text-white py-16 mb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Guest Experiences</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">See what our travelers have to say about their journeys with New Road Travels.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 relative">
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-nepal-red/20" />
                            <div className="flex items-center gap-4 mb-6">
                                <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-100" />
                                <div>
                                    <h3 className="font-bold text-slate-900">{review.name}</h3>
                                    <p className="text-sm text-slate-500">{review.role}</p>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed italic">"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
