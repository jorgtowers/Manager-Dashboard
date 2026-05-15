import Meeting from './models/meeting.model';
import Assignment from './models/assignment.model';
import Client from './models/client.model';
import Todo from './models/todo.model';
import Service from './models/service.model';
import CriticalService from './models/criticalService.model';
import { defaultData } from './utils/defaultData';

export const seedDatabase = async () => {
    try {
        // Check if data already exists to prevent re-seeding
        const meetingCount = await Meeting.count();
        if (meetingCount > 0) {
            console.log('Database already seeded. Skipping.');
            return;
        }

        console.log('Seeding database with initial data...');

        // Using bulkCreate to insert multiple records at once
        await Meeting.bulkCreate(defaultData.meetings);
        console.log('-> Meetings seeded.');

        await Assignment.bulkCreate(defaultData.assignments);
        console.log('-> Assignments seeded.');

        await Client.bulkCreate(defaultData.clients);
        console.log('-> Clients seeded.');

        await Todo.bulkCreate(defaultData.todos);
        console.log('-> Todos seeded.');

        await Service.bulkCreate(defaultData.services);
        console.log('-> Services seeded.');

        await CriticalService.bulkCreate(defaultData.criticalServices);
        console.log('-> Critical Services seeded.');

        console.log('Database seeding completed successfully!');

    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};