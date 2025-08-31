import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Plus, Megaphone } from "lucide-react";

const AdminAnnouncements = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Announcements
                </h1>
                <p className="text-gray-600">
                    Manage school announcements and updates
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Announcements</CardTitle>
                            <CardDescription>
                                Create and manage announcements for students and
                                parents
                            </CardDescription>
                        </div>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Announcement
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-gray-500">
                        <Megaphone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>
                            No announcements yet. Create your first announcement
                            to get started.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminAnnouncements;
