import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Admissions = () => {
    return (
        <div className="min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Admissions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join our community of learners and start your journey
                        towards academic excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Requirements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Birth Certificate</li>
                                <li>• Report Card from previous school</li>
                                <li>• Certificate of Good Moral Character</li>
                                <li>• 2x2 ID Picture</li>
                                <li>• Application Form</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Application Process</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="space-y-2 text-gray-700">
                                <li>1. Submit requirements</li>
                                <li>2. Take entrance examination</li>
                                <li>3. Interview with guidance counselor</li>
                                <li>4. Receive acceptance letter</li>
                                <li>5. Complete enrollment</li>
                            </ol>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center">
                    <Button size="lg">Download Application Form</Button>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
