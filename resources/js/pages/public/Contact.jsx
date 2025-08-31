import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get in touch with us. We're here to help and answer any
                        questions you may have.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Address
                                    </h3>
                                    <p className="text-gray-600">
                                        Taft, Eastern Samar, Philippines
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Phone className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Phone
                                    </h3>
                                    <p className="text-gray-600">
                                        +63 XXX XXX XXXX
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Mail className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Email
                                    </h3>
                                    <p className="text-gray-600">
                                        info@taftnhs.edu.ph
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Clock className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Office Hours
                                    </h3>
                                    <p className="text-gray-600">
                                        Monday - Friday: 7:00 AM - 5:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                                <CardDescription>
                                    Fill out the form below and we'll get back
                                    to you as soon as possible.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="What is this about?"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Your message..."
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
