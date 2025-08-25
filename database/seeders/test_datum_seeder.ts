import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { nanoid } from 'nanoid'
import User from '#models/user'
import Project from '#models/project'
import Notification from '#models/notification'
import Template from '#models/template'
import NotificationDelivery from '#models/notification_delivery'
import Attribute from '#models/attribute'
import AttributeValue from '#models/attribute_value'
import Channel from '#enums/channel'
import NotificationDeliveryStatus from '#enums/notification_delivery_status'
import AttributeType from '#enums/attribute_type'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Create test users
    const user1 = await User.create({
      fullName: 'John Doe',
      email: 'john@company.com',
      password: '123456789',
    })

    const user2 = await User.create({
      fullName: 'Jane Smith',
      email: 'jane@company.com',
      password: '123456789',
    })

    const user3 = await User.create({
      fullName: 'Bob Wilson',
      email: 'bob@company.com',
      password: '123456789',
    })

    const user4 = await User.create({
      fullName: 'Alice Johnson',
      email: 'alice@company.com',
      password: '123456789',
    })

    // Create test projects for different users
    const project1 = await Project.create({
      name: 'E-commerce App',
      userId: user1.id,
      apiKey: nanoid(32),
      isActive: true,
    })

    const project2 = await Project.create({
      name: 'Social Media Platform',
      userId: user1.id,
      apiKey: nanoid(32),
      isActive: true,
    })

    const project3 = await Project.create({
      name: 'Banking System',
      userId: user1.id,
      apiKey: nanoid(32),
      isActive: false, // Inactive project for testing
    })

    const project4 = await Project.create({
      name: 'Mobile Game',
      userId: user2.id,
      apiKey: nanoid(32),
      isActive: true,
    })

    const project5 = await Project.create({
      name: 'CRM System',
      userId: user2.id,
      apiKey: nanoid(32),
      isActive: true,
    })

    const project6 = await Project.create({
      name: 'Analytics Dashboard',
      userId: user3.id,
      apiKey: nanoid(32),
      isActive: true,
    })

    const project7 = await Project.create({
      name: 'Inventory Management',
      userId: user4.id,
      apiKey: nanoid(32),
      isActive: true,
    })

    const project8 = await Project.create({
      name: 'Customer Support',
      userId: user4.id,
      apiKey: nanoid(32),
      isActive: false, // Inactive project for testing
    })

    // Create test notifications for different users
    const notification1 = await Notification.create({
      projectId: project1.id,
      title: 'Order Confirmation',
      externalId: 'order_123',
    })

    const notification2 = await Notification.create({
      projectId: project1.id,
      title: 'Shipping Update',
      externalId: 'ship_456',
    })

    const notification3 = await Notification.create({
      projectId: project2.id,
      title: 'New Message',
      externalId: 'msg_789',
    })

    const notification4 = await Notification.create({
      projectId: project2.id,
      title: 'Friend Request',
      externalId: 'friend_101',
    })

    const notification5 = await Notification.create({
      projectId: project3.id,
      title: 'Transaction Alert',
      externalId: 'txn_202',
    })

    const notification6 = await Notification.create({
      projectId: project4.id,
      title: 'Level Up Achievement',
      externalId: 'level_303',
    })

    const notification7 = await Notification.create({
      projectId: project4.id,
      title: 'Daily Bonus Available',
      externalId: 'bonus_404',
    })

    const notification8 = await Notification.create({
      projectId: project5.id,
      title: 'New Lead Assigned',
      externalId: 'lead_505',
    })

    const notification9 = await Notification.create({
      projectId: project5.id,
      title: 'Meeting Reminder',
      externalId: 'meeting_606',
    })

    const notification10 = await Notification.create({
      projectId: project6.id,
      title: 'Report Generated',
      externalId: 'report_707',
    })

    const notification11 = await Notification.create({
      projectId: project6.id,
      title: 'Anomaly Detected',
      externalId: 'anomaly_808',
    })

    const notification12 = await Notification.create({
      projectId: project7.id,
      title: 'Low Stock Alert',
      externalId: 'stock_909',
    })

    const notification13 = await Notification.create({
      projectId: project7.id,
      title: 'Order Received',
      externalId: 'order_1010',
    })

    const notification14 = await Notification.create({
      projectId: project8.id,
      title: 'Ticket Assigned',
      externalId: 'ticket_1111',
    })

    const notification15 = await Notification.create({
      projectId: project8.id,
      title: 'Customer Feedback',
      externalId: 'feedback_1212',
    })

    // Create test templates for different notifications
    const template1 = await Template.create({
      notificationId: notification1.id,
      channel: Channel.EMAIL,
      content: 'Hi {{customerName}}, your order #{{orderNumber}} has been confirmed!',
    })

    const template2 = await Template.create({
      notificationId: notification1.id,
      channel: Channel.SMS,
      content: 'Order confirmed! Order #{{orderNumber}} will be shipped soon.',
    })

    const template3 = await Template.create({
      notificationId: notification1.id,
      channel: Channel.PUSH,
      content: '🎉 Order confirmed! Check your email for details.',
    })

    const template4 = await Template.create({
      notificationId: notification2.id,
      channel: Channel.EMAIL,
      content: 'Your order #{{orderNumber}} has been shipped! Track at {{trackingUrl}}',
    })

    const template5 = await Template.create({
      notificationId: notification2.id,
      channel: Channel.SMS,
      content: 'Order shipped! Track: {{trackingUrl}}',
    })

    const template6 = await Template.create({
      notificationId: notification3.id,
      channel: Channel.PUSH,
      content: '💬 New message from {{senderName}}',
    })

    const template7 = await Template.create({
      notificationId: notification4.id,
      channel: Channel.EMAIL,
      content: '{{friendName}} wants to be your friend!',
    })

    const template8 = await Template.create({
      notificationId: notification5.id,
      channel: Channel.SMS,
      content: 'Transaction: {{amount}} to {{recipient}}',
    })

    const template9 = await Template.create({
      notificationId: notification6.id,
      channel: Channel.PUSH,
      content: '🏆 Level Up! You reached level {{level}}!',
    })

    const template10 = await Template.create({
      notificationId: notification7.id,
      channel: Channel.EMAIL,
      content: 'Daily bonus of {{bonusAmount}} coins is available!',
    })

    const template11 = await Template.create({
      notificationId: notification8.id,
      channel: Channel.SMS,
      content: 'New lead: {{leadName}} - {{company}}',
    })

    const template12 = await Template.create({
      notificationId: notification9.id,
      channel: Channel.EMAIL,
      content: 'Meeting reminder: {{meetingTitle}} at {{meetingTime}}',
    })

    const template13 = await Template.create({
      notificationId: notification10.id,
      channel: Channel.PUSH,
      content: '📊 Report ready: {{reportName}}',
    })

    const template14 = await Template.create({
      notificationId: notification11.id,
      channel: Channel.EMAIL,
      content: 'Anomaly detected in {{metricName}}: {{anomalyValue}}',
    })

    const template15 = await Template.create({
      notificationId: notification12.id,
      channel: Channel.SMS,
      content: 'Low stock alert: {{productName}} ({{currentStock}} remaining)',
    })

    const template16 = await Template.create({
      notificationId: notification13.id,
      channel: Channel.EMAIL,
      content: 'New order received: {{orderNumber}} for {{customerName}}',
    })

    const template17 = await Template.create({
      notificationId: notification14.id,
      channel: Channel.PUSH,
      content: '🎫 Ticket assigned: {{ticketId}} - {{issue}}',
    })

    const template18 = await Template.create({
      notificationId: notification15.id,
      channel: Channel.EMAIL,
      content: 'Customer feedback received: {{rating}}/5 stars',
    })

    // Create test attributes for templates
    const attribute1 = await Attribute.create({
      templateId: template1.id,
      name: 'customerName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute2 = await Attribute.create({
      templateId: template1.id,
      name: 'orderNumber',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute3 = await Attribute.create({
      templateId: template4.id,
      name: 'trackingUrl',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute4 = await Attribute.create({
      templateId: template6.id,
      name: 'senderName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute5 = await Attribute.create({
      templateId: template7.id,
      name: 'friendName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute6 = await Attribute.create({
      templateId: template8.id,
      name: 'amount',
      type: AttributeType.NUMBER,
      isRequired: true,
    })

    const attribute7 = await Attribute.create({
      templateId: template8.id,
      name: 'recipient',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute8 = await Attribute.create({
      templateId: template9.id,
      name: 'level',
      type: AttributeType.NUMBER,
      isRequired: true,
    })

    const attribute9 = await Attribute.create({
      templateId: template10.id,
      name: 'bonusAmount',
      type: AttributeType.NUMBER,
      isRequired: true,
    })

    const attribute10 = await Attribute.create({
      templateId: template11.id,
      name: 'leadName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute11 = await Attribute.create({
      templateId: template11.id,
      name: 'company',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute12 = await Attribute.create({
      templateId: template12.id,
      name: 'meetingTitle',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute13 = await Attribute.create({
      templateId: template12.id,
      name: 'meetingTime',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute14 = await Attribute.create({
      templateId: template13.id,
      name: 'reportName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute15 = await Attribute.create({
      templateId: template14.id,
      name: 'metricName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute16 = await Attribute.create({
      templateId: template14.id,
      name: 'anomalyValue',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute17 = await Attribute.create({
      templateId: template15.id,
      name: 'productName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute18 = await Attribute.create({
      templateId: template15.id,
      name: 'currentStock',
      type: AttributeType.NUMBER,
      isRequired: true,
    })

    const attribute19 = await Attribute.create({
      templateId: template16.id,
      name: 'orderNumber',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute20 = await Attribute.create({
      templateId: template16.id,
      name: 'customerName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute21 = await Attribute.create({
      templateId: template17.id,
      name: 'ticketId',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute22 = await Attribute.create({
      templateId: template17.id,
      name: 'issue',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    const attribute23 = await Attribute.create({
      templateId: template18.id,
      name: 'rating',
      type: AttributeType.NUMBER,
      isRequired: true,
    })

    // Create test notification deliveries for different users
    const delivery1 = await NotificationDelivery.create({
      templateId: template1.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'john@example.com',
      sentAt: DateTime.now(),
    })

    const delivery2 = await NotificationDelivery.create({
      templateId: template1.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'jane@example.com',
      sentAt: DateTime.now(),
    })

    const delivery3 = await NotificationDelivery.create({
      templateId: template2.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1234567890',
      sentAt: DateTime.now(),
    })

    const delivery4 = await NotificationDelivery.create({
      templateId: template3.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_123',
      sentAt: DateTime.now(),
    })

    const delivery5 = await NotificationDelivery.create({
      templateId: template4.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'john@example.com',
      sentAt: DateTime.now(),
    })

    const delivery6 = await NotificationDelivery.create({
      templateId: template5.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1234567890',
      sentAt: DateTime.now(),
    })

    const delivery7 = await NotificationDelivery.create({
      templateId: template6.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_456',
      sentAt: DateTime.now(),
    })

    const delivery8 = await NotificationDelivery.create({
      templateId: template7.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'john@example.com',
      sentAt: DateTime.now(),
    })

    const delivery9 = await NotificationDelivery.create({
      templateId: template8.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1234567890',
      sentAt: DateTime.now(),
    })

    // User 2's deliveries (Mobile Game & CRM)
    const delivery10 = await NotificationDelivery.create({
      templateId: template9.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_789',
      sentAt: DateTime.now(),
    })

    const delivery11 = await NotificationDelivery.create({
      templateId: template10.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'player@game.com',
      sentAt: DateTime.now(),
    })

    const delivery12 = await NotificationDelivery.create({
      templateId: template11.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1987654321',
      sentAt: DateTime.now(),
    })

    const delivery13 = await NotificationDelivery.create({
      templateId: template12.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'sales@crm.com',
      sentAt: DateTime.now(),
    })

    // User 3's deliveries (Analytics)
    const delivery14 = await NotificationDelivery.create({
      templateId: template13.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_analytics',
      sentAt: DateTime.now(),
    })

    const delivery15 = await NotificationDelivery.create({
      templateId: template14.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'analyst@company.com',
      sentAt: DateTime.now(),
    })

    // User 4's deliveries (Inventory & Support)
    const delivery16 = await NotificationDelivery.create({
      templateId: template15.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1555666777',
      sentAt: DateTime.now(),
    })

    const delivery17 = await NotificationDelivery.create({
      templateId: template16.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'warehouse@company.com',
      sentAt: DateTime.now(),
    })

    const delivery18 = await NotificationDelivery.create({
      templateId: template17.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_support',
      sentAt: DateTime.now(),
    })

    const delivery19 = await NotificationDelivery.create({
      templateId: template18.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'support@company.com',
      sentAt: DateTime.now(),
    })

    // Create some failed deliveries for testing
    const failedDelivery1 = await NotificationDelivery.create({
      templateId: template1.id,
      status: NotificationDeliveryStatus.FAILED,
      recipient: 'invalid@email',
      failReason: 'Invalid email address',
    })

    const failedDelivery2 = await NotificationDelivery.create({
      templateId: template2.id,
      status: NotificationDeliveryStatus.FAILED,
      recipient: '+9999999999',
      failReason: 'Phone number not supported',
    })

    // Create some pending deliveries
    const pendingDelivery1 = await NotificationDelivery.create({
      templateId: template3.id,
      status: NotificationDeliveryStatus.PENDING,
      recipient: 'device_token_789',
    })

    const pendingDelivery2 = await NotificationDelivery.create({
      templateId: template4.id,
      status: NotificationDeliveryStatus.PENDING,
      recipient: 'user@example.com',
    })

    // Create attribute values for some deliveries
    await AttributeValue.create({
      notificationDeliveryId: delivery1.id,
      attributeId: attribute1.id,
      valueString: 'John Doe',
    })

    await AttributeValue.create({
      notificationDeliveryId: delivery1.id,
      attributeId: attribute2.id,
      valueString: 'ORD-001',
    })

    await AttributeValue.create({
      notificationDeliveryId: delivery2.id,
      attributeId: attribute1.id,
      valueString: 'Jane Smith',
    })

    await AttributeValue.create({
      notificationDeliveryId: delivery2.id,
      attributeId: attribute2.id,
      valueString: 'ORD-002',
    })

    await AttributeValue.create({
      notificationDeliveryId: delivery5.id,
      attributeId: attribute3.id,
      valueString: 'https://track.example.com/123',
    })

    await AttributeValue.create({
      notificationDeliveryId: delivery6.id,
      attributeId: attribute3.id,
      valueString: 'https://track.example.com/123',
    })

    await AttributeValue.create({
      notificationDeliveryId: delivery7.id,
      attributeId: attribute4.id,
      valueString: 'Alice Johnson',
    })

    await AttributeValue.create({
      notificationDeliveryId: delivery8.id,
      attributeId: attribute5.id,
      valueString: 'Bob Wilson',
    })

    await AttributeValue.create({
      notificationDeliveryId: delivery9.id,
      attributeId: attribute6.id,
      valueNumber: 150.0,
    })

    await AttributeValue.create({
      notificationDeliveryId: delivery9.id,
      attributeId: attribute7.id,
      valueString: 'Jane Smith',
    })

    console.log('✅ Test data seeded successfully!')
    console.log(`👥 Created: ${await User.query().count('* as total')} users`)
    console.log(`📁 Created: ${await Project.query().count('* as total')} projects`)
    console.log(`📢 Created: ${await Notification.query().count('* as total')} notifications`)
    console.log(`📝 Created: ${await Template.query().count('* as total')} templates`)
    console.log(`📤 Created: ${await NotificationDelivery.query().count('* as total')} deliveries`)
    console.log(`🏷️ Created: ${await Attribute.query().count('* as total')} attributes`)
    console.log(`💾 Created: ${await AttributeValue.query().count('* as total')} attribute values`)

    console.log('\n🔐 Test Users (all with password: 123456789):')
    console.log('  - john@company.com (John Doe)')
    console.log('  - jane@company.com (Jane Smith)')
    console.log('  - bob@company.com (Bob Wilson)')
    console.log('  - alice@company.com (Alice Johnson)')

    console.log('\n📊 Expected Dashboard Stats:')
    console.log('  - Total Notifications: 15')
    console.log('  - Email Deliveries: 8')
    console.log('  - SMS Sent: 6')
    console.log('  - Push Notifications: 5')

    console.log('\n🧪 Permission Testing:')
    console.log('  - User 1 (John): 3 projects, 5 notifications')
    console.log('  - User 2 (Jane): 2 projects, 4 notifications')
    console.log('  - User 3 (Bob): 1 project, 2 notifications')
    console.log('  - User 4 (Alice): 2 projects, 4 notifications')
  }
}
