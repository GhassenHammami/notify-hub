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
      content: `<body id="ie9i" style="box-sizing: border-box; margin: 0;">
   <div id="i8rp" class="container" style="margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; overflow-x: hidden; overflow-y: hidden; float: none; box-sizing: border-box; max-width: 600px; margin: 0 auto; background-color: rgb(255, 255, 255); border-radius: 8px; overflow: hidden; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
      <div id="ichy" class="header" style="background-position-x: initial; background-position-y: initial; background-origin: initial; background-clip: initial; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; font-family: Arial, Helvetica, sans-serif; background-image: unset; background-repeat: unset; background-position: unset; background-attachment: unset; background-size: unset; background-image-color: unset; background-image-gradient: unset; background-image-gradient-dir: unset; background-image-gradient-type: unset; box-sizing: border-box; background-color: rgb(44, 62, 80); color: white; padding: 32px 24px; text-align: center;">
         <h1 id="irgl" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; box-sizing: border-box; margin: 0; font-size: 28px; font-weight: 600; color: white;">
            🎉 Order Confirmed!
         </h1>
      </div>
      <div id="i4po5" class="content" style="padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; box-sizing: border-box; padding: 32px 24px; color: rgb(55, 65, 81); background-color: rgb(249, 249, 249);">
         <h2 id="iegz6" style="margin-top: 0px; box-sizing: border-box; color: rgb(31, 41, 55); margin: 0 0 20px 0; font-size: 20px;">
            Hi {{customerName}},
         </h2>
         <p id="inwsr" style="box-sizing: border-box; margin: 0 0 20px 0;">
            Great news! Your order has been confirmed and is being prepared for shipment.
         </p>
         <div id="i5i0a" class="order-details" style="box-sizing: border-box; background-color: rgb(255, 255, 255); padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 id="iui1k" style="box-sizing: border-box; margin: 0 0 15px 0; font-size: 18px; color: rgb(31, 41, 55);">
               Order Details
            </h3>
            <p id="iw74d" style="box-sizing: border-box; margin: 0 0 10px 0;"><strong style="box-sizing: border-box;">Order Number:</strong> {{orderNumber}}
            </p>
            <p id="ivdbi" style="box-sizing: border-box; margin: 0 0 10px 0;"><strong style="box-sizing: border-box;">Status:</strong> Confirmed
            </p>
            <p id="ix8s4" style="box-sizing: border-box; margin: 0 0 10px 0;"><strong style="box-sizing: border-box;">Estimated Delivery:</strong> 3-5 business days
            </p>
         </div>
         <p id="immwk" style="box-sizing: border-box; margin: 0 0 20px 0;">
            We'll send you another email with tracking information once your order ships.
         </p>
         <p id="ixtj9" style="box-sizing: border-box; margin: 0;">
            Thank you for your business!
         </p>
      </div>
      <div id="if2bu" class="footer" style="padding-top: 24px; padding-right: 24px; padding-bottom: 24px; padding-left: 24px; box-sizing: border-box; background-color: rgb(249, 250, 251); padding: 24px; text-align: center; color: rgb(107, 114, 128); font-size: 14px;">
         <p id="iaauz" style="box-sizing: border-box; margin: 0;">
            © 2025 Your Company. All rights reserved.
         </p>
      </div>
   </div>
</body>
<style>
   @media (max-width: 480px) {
   .container {
   width: 90%;
   margin-top: 0px;
   margin-right: auto;
   margin-bottom: 0px;
   margin-left: auto;
   }
   .header {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .content {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .footer {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   }
</style>`,
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
      content: `<body id="ie9i" style="box-sizing: border-box; margin: 0;">
   <div class="container" id="ipkj" style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; overflow-x: hidden; overflow-y: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: rgb(249, 250, 251); float: none; max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
      <div class="header" id="iv7z" style="box-sizing: border-box; background-position-x: initial; background-position-y: initial; background-origin: initial; background-clip: initial; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; font-family: Arial, Helvetica, sans-serif; background-image: unset; background-repeat: unset; background-position: unset; background-attachment: unset; background-size: unset; background-image-color: unset; background-image-gradient: unset; background-image-gradient-dir: unset; background-image-gradient-type: unset; background-color: #22C55E; color: white; padding: 32px 24px; text-align: center;">
         <h1 style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 28px; font-weight: 600; color: white;">📦 Your Order is on the Way!</h1>
      </div>
      <div class="content" id="ijn7" style="box-sizing: border-box; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; background-color: #F9F9F9; padding: 32px 24px; color: #374151;">
         <p style="box-sizing: border-box;">Hi {{customerName}},</p>
         <p style="box-sizing: border-box;">Good news! Your order has been shipped and is on its way to you.</p>
         <div class="card" id="iaadz" style="box-sizing: border-box; background: #fff; padding: 20px; border-radius: 5px; margin-top: 20px; text-align: center;">
            <p style="box-sizing: border-box;"><strong style="box-sizing: border-box;">Order Number:</strong> {{orderNumber}}</p>
            <a href="{{trackingUrl}}" id="i9lnh" style="box-sizing: border-box; display: inline-block; margin-top: 10px; padding: 12px 20px; background: #3B82F6; color: white; border-radius: 5px; text-decoration: none;">Track Package</a>
         </div>
         <p id="im7s2" style="box-sizing: border-box; margin-top: 20px;">You can track your package anytime using the button above.</p>
      </div>
      <div class="footer" id="i29wf" style="box-sizing: border-box; background-color: rgb(249, 250, 251); padding-top: 24px; padding-right: 24px; padding-bottom: 24px; padding-left: 24px; background: #F9FAFB; padding: 24px; text-align: center; color: #6B7280; font-size: 14px;">
         <p style="box-sizing: border-box;">© 2025 Your Company. All rights reserved.</p>
      </div>
   </div>
</body>
<style>
   @media (max-width: 480px) {
   .container {
   width: 90%;
   margin-top: 0px;
   margin-right: auto;
   margin-bottom: 0px;
   margin-left: auto;
   }
   .header {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .content {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .footer {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   }
</style>`,
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
      content: `<body id="ie9i" style="box-sizing: border-box; margin: 0;">
   <div class="container" id="iix9" style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; overflow-x: hidden; overflow-y: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: rgb(249, 250, 251); float: none; max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
      <div class="header" id="ib3t" style="box-sizing: border-box; background-position-x: initial; background-position-y: initial; background-origin: initial; background-clip: initial; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; font-family: Arial, Helvetica, sans-serif; background-image: unset; background-repeat: unset; background-position: unset; background-attachment: unset; background-size: unset; background-image-color: unset; background-image-gradient: unset; background-image-gradient-dir: unset; background-image-gradient-type: unset; background-color: #8B5CF6; color: white; padding: 32px 24px; text-align: center;">
         <h1 style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 28px; font-weight: 600; color: white;">👥 New Friend Request</h1>
      </div>
      <div class="content" id="i6xn" style="box-sizing: border-box; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; background-color: #F9F9F9; padding: 32px 24px; color: #374151;">
         <p style="box-sizing: border-box;">Hi {{customerName}},</p>
         <p style="box-sizing: border-box;">Someone wants to connect with you!</p>
         <div class="card" id="i78kr" style="box-sizing: border-box; background: #fff; padding: 20px; border-radius: 5px; margin-top: 20px; text-align: center;">
            <div id="igzfr" style="box-sizing: border-box; font-size: 50px;">👤</div>
            <p style="box-sizing: border-box;"><strong style="box-sizing: border-box;">{{friendName}}</strong> wants to be your friend</p>
            <div id="iz1tq" style="box-sizing: border-box; margin-top: 15px;"><a href="#" id="ilamo" style="box-sizing: border-box; display: inline-block; margin-right: 10px; padding: 10px 16px; background: #22C55E; color: white; border-radius: 5px; text-decoration: none;">Accept Request</a><a href="#" id="ikre6" style="box-sizing: border-box; display: inline-block; padding: 10px 16px; background: #EF4444; color: white; border-radius: 5px; text-decoration: none;">Decline</a></div>
         </div>
      </div>
      <div class="footer" id="iqirx" style="box-sizing: border-box; background-color: rgb(249, 250, 251); padding-top: 24px; padding-right: 24px; padding-bottom: 24px; padding-left: 24px; background: #F9FAFB; padding: 24px; text-align: center; color: #6B7280; font-size: 14px;">
         <p style="box-sizing: border-box;">© 2025 Your Social Platform. All rights reserved.</p>
      </div>
   </div>
</body>
<style>
   @media (max-width: 480px) {
   .container {
   width: 90%;
   margin-top: 0px;
   margin-right: auto;
   margin-bottom: 0px;
   margin-left: auto;
   }
   .header {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .content {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .footer {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   }
</style>`,
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
      content: `<body id="ie9i" style="box-sizing: border-box; margin: 0;">
   <div class="container" id="iubm" style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; overflow-x: hidden; overflow-y: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: rgb(249, 250, 251); float: none; max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
      <div class="header" id="i0w4" style="box-sizing: border-box; background-position-x: initial; background-position-y: initial; background-origin: initial; background-clip: initial; background-color: #ffffff; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; font-family: Arial, Helvetica, sans-serif; background-image: unset; background-repeat: unset; background-position: unset; background-attachment: unset; background-size: unset; background-image-color: unset; background-image-gradient: unset; background-image-gradient-dir: unset; background-image-gradient-type: unset; background: linear-gradient(90deg,#F97316,#F59E0B); color: white; padding: 32px 24px; text-align: center;">
         <h1 style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 28px; font-weight: 600; color: white;">🎁 Daily Bonus Available!</h1>
      </div>
      <div class="content" id="ivzn" style="box-sizing: border-box; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; background-color: #F9F9F9; padding: 32px 24px; color: #374151;">
         <p style="box-sizing: border-box;">Hi {{customerName}},</p>
         <p style="box-sizing: border-box;">Don't miss out on your daily reward!</p>
         <div class="card" id="itatq" style="box-sizing: border-box; background: #fff; padding: 20px; border-radius: 5px; margin-top: 20px; border: 2px solid #F97316; text-align: center;">
            <div id="isb3s" style="box-sizing: border-box; font-size: 50px;">💰</div>
            <h3 style="box-sizing: border-box;">Daily Bonus</h3>
            <p id="ifjwj" style="box-sizing: border-box; font-size: 28px; font-weight: bold;">{{bonusAmount}}</p>
            <a href="#" id="ilv7l" style="box-sizing: border-box; display: inline-block; margin-top: 10px; padding: 12px 20px; background: #F97316; color: white; border-radius: 5px; text-decoration: none;">Claim Now</a>
            <p id="im7z4" style="box-sizing: border-box; margin-top: 10px; font-size: 12px; color: #EF4444;">Bonus expires in 24 hours</p>
         </div>
      </div>
      <div class="footer" id="ihgoo" style="box-sizing: border-box; background-color: rgb(249, 250, 251); padding-top: 24px; padding-right: 24px; padding-bottom: 24px; padding-left: 24px; background: #F9FAFB; padding: 24px; text-align: center; color: #6B7280; font-size: 14px;">
         <p style="box-sizing: border-box;">© 2025 Your Game Studio. All rights reserved.</p>
      </div>
   </div>
</body>
<style>
   @media (max-width: 480px) {
   .container {
   width: 90%;
   margin-top: 0px;
   margin-right: auto;
   margin-bottom: 0px;
   margin-left: auto;
   }
   .header {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .content {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .footer {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   }
</style>`,
    })

    const template11 = await Template.create({
      notificationId: notification8.id,
      channel: Channel.SMS,
      content: 'New lead: {{leadName}} - {{company}}',
    })

    const template12 = await Template.create({
      notificationId: notification9.id,
      channel: Channel.EMAIL,
      content: `<body id="ie9i" style="box-sizing: border-box; margin: 0;">
   <div class="container" id="iq66" style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; overflow-x: hidden; overflow-y: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: rgb(249, 250, 251); float: none; max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
      <div class="header" id="i4m8" style="box-sizing: border-box; background-position-x: initial; background-position-y: initial; background-origin: initial; background-clip: initial; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; font-family: Arial, Helvetica, sans-serif; background-image: unset; background-repeat: unset; background-position: unset; background-attachment: unset; background-size: unset; background-image-color: unset; background-image-gradient: unset; background-image-gradient-dir: unset; background-image-gradient-type: unset; background-color: #3B82F6; color: white; padding: 32px 24px; text-align: center;">
         <h1 style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 28px; font-weight: 600; color: white;">⏰ Meeting Reminder</h1>
      </div>
      <div class="content" id="itxm" style="box-sizing: border-box; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; background-color: #F9F9F9; padding: 32px 24px; color: #374151;">
         <p style="box-sizing: border-box;">Hi {{customerName}},</p>
         <p style="box-sizing: border-box;">Don't forget your upcoming meeting!</p>
         <div class="card" id="i9ntj" style="box-sizing: border-box; background: #fff; padding: 20px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #3B82F6; text-align: center;">
            <p style="box-sizing: border-box;"><strong style="box-sizing: border-box;">{{meetingTitle}}</strong></p>
            <p id="itsxw" style="box-sizing: border-box; margin: 10px 0; font-weight: bold;">📅 {{meetingTime}}</p>
            <a href="#" id="iss1c" style="box-sizing: border-box; display: inline-block; margin-top: 10px; padding: 12px 20px; background: #22C55E; color: white; border-radius: 5px; text-decoration: none;">Join Meeting</a>
         </div>
      </div>
      <div class="footer" id="inymc" style="box-sizing: border-box; background-color: rgb(249, 250, 251); padding-top: 24px; padding-right: 24px; padding-bottom: 24px; padding-left: 24px; background: #F9FAFB; padding: 24px; text-align: center; color: #6B7280; font-size: 14px;">
         <p style="box-sizing: border-box;">© 2025 Your CRM System. All rights reserved.</p>
      </div>
   </div>
</body>
<style>
   @media (max-width: 480px) {
   .container {
   width: 90%;
   margin-top: 0px;
   margin-right: auto;
   margin-bottom: 0px;
   margin-left: auto;
   }
   .header {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .content {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .footer {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   }
</style>`,
    })

    const template13 = await Template.create({
      notificationId: notification10.id,
      channel: Channel.PUSH,
      content: '📊 Report ready: {{reportName}}',
    })

    const template14 = await Template.create({
      notificationId: notification11.id,
      channel: Channel.EMAIL,
      content: `<body id="ie9i" style="box-sizing: border-box; margin: 0;">
   <div class="container" id="ia6m" style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; overflow-x: hidden; overflow-y: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: rgb(249, 250, 251); float: none; max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
      <div class="header" id="i9tg" style="box-sizing: border-box; background-position-x: initial; background-position-y: initial; background-origin: initial; background-clip: initial; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; font-family: Arial, Helvetica, sans-serif; background-image: unset; background-repeat: unset; background-position: unset; background-attachment: unset; background-size: unset; background-image-color: unset; background-image-gradient: unset; background-image-gradient-dir: unset; background-image-gradient-type: unset; background-color: #EF4444; color: white; padding: 32px 24px; text-align: center;">
         <h1 style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 28px; font-weight: 600; color: white;">⚠️ Anomaly Detected</h1>
      </div>
      <div class="content" id="ikpw" style="box-sizing: border-box; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; background-color: #F9F9F9; padding: 32px 24px; color: #374151;">
         <p style="box-sizing: border-box;">Hi {{customerName}},</p>
         <p style="box-sizing: border-box;">We detected unusual patterns in your data.</p>
         <div class="card" id="i8nsj" style="box-sizing: border-box; background: #fff; padding: 20px; border-radius: 5px; margin-top: 20px; border: 2px solid #EF4444; text-align: center;">
            <h3 style="box-sizing: border-box;">🚨 Anomaly Details</h3>
            <p style="box-sizing: border-box;"><strong style="box-sizing: border-box;">Metric:</strong> {{metricName}}</p>
            <p id="irqai" style="box-sizing: border-box; font-size: 28px; font-weight: bold; color: #B91C1C;">{{anomalyValue}}</p>
            <a href="#" id="i4b07" style="box-sizing: border-box; display: inline-block; margin-top: 10px; padding: 12px 20px; background: #EF4444; color: white; border-radius: 5px; text-decoration: none;">View Dashboard</a>
         </div>
      </div>
      <div class="footer" id="i8dfu" style="box-sizing: border-box; background-color: rgb(249, 250, 251); padding-top: 24px; padding-right: 24px; padding-bottom: 24px; padding-left: 24px; background: #F9FAFB; padding: 24px; text-align: center; color: #6B7280; font-size: 14px;">
         <p style="box-sizing: border-box;">© 2025 Analytics Platform. All rights reserved.</p>
      </div>
   </div>
</body>
<style>
   @media (max-width: 480px) {
   .container {
   width: 90%;
   margin-top: 0px;
   margin-right: auto;
   margin-bottom: 0px;
   margin-left: auto;
   }
   .header {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .content {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .footer {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   }
</style>`,
    })

    const template15 = await Template.create({
      notificationId: notification12.id,
      channel: Channel.SMS,
      content: 'Low stock alert: {{productName}} ({{currentStock}} remaining)',
    })

    const template16 = await Template.create({
      notificationId: notification13.id,
      channel: Channel.EMAIL,
      content: `<body id="ie9i" style="box-sizing: border-box; margin: 0;">
   <div class="container" id="ipjx" style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; overflow-x: hidden; overflow-y: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: rgb(249, 250, 251); float: none; max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
      <div class="header" id="i1ay" style="box-sizing: border-box; background-position-x: initial; background-position-y: initial; background-origin: initial; background-clip: initial; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; font-family: Arial, Helvetica, sans-serif; background-image: unset; background-repeat: unset; background-position: unset; background-attachment: unset; background-size: unset; background-image-color: unset; background-image-gradient: unset; background-image-gradient-dir: unset; background-image-gradient-type: unset; background-color: #22C55E; color: white; padding: 32px 24px; text-align: center;">
         <h1 style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 28px; font-weight: 600; color: white;">📦 New Order Received</h1>
      </div>
      <div class="content" id="isl7" style="box-sizing: border-box; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; background-color: #F9F9F9; padding: 32px 24px; color: #374151;">
         <p style="box-sizing: border-box;">Hi Team,</p>
         <p style="box-sizing: border-box;">You have a new order to process!</p>
         <div class="card" id="ixtlm" style="box-sizing: border-box; background: #fff; padding: 20px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #22C55E; text-align: center;">
            <p id="i1d37" style="box-sizing: border-box; font-size: 24px; font-weight: bold;">Order #{{orderNumber}}</p>
            <p style="box-sizing: border-box;">Customer: {{customerName}}</p>
            <p style="box-sizing: border-box;">Status: Pending | Priority: High</p>
            <a href="#" id="im6nj" style="box-sizing: border-box; display: inline-block; margin-top: 10px; padding: 12px 20px; background: #22C55E; color: white; border-radius: 5px; text-decoration: none;">View Order Details</a>
         </div>
      </div>
      <div class="footer" id="iv4da" style="box-sizing: border-box; background-color: rgb(249, 250, 251); padding-top: 24px; padding-right: 24px; padding-bottom: 24px; padding-left: 24px; background: #F9FAFB; padding: 24px; text-align: center; color: #6B7280; font-size: 14px;">
         <p style="box-sizing: border-box;">© 2025 Inventory Management. All rights reserved.</p>
      </div>
   </div>
</body>
<style>
   @media (max-width: 480px) {
   .container {
   width: 90%;
   margin-top: 0px;
   margin-right: auto;
   margin-bottom: 0px;
   margin-left: auto;
   }
   .header {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .content {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .footer {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   }
</style>`,
    })

    const template17 = await Template.create({
      notificationId: notification14.id,
      channel: Channel.PUSH,
      content: '🎫 Ticket assigned: {{ticketId}} - {{issue}}',
    })

    const template18 = await Template.create({
      notificationId: notification15.id,
      channel: Channel.EMAIL,
      content: `<body id="ie9i" style="box-sizing: border-box; margin: 0;">
   <div class="container" id="i24o" style="box-sizing: border-box; margin-top: 0px; margin-right: auto; margin-bottom: 0px; margin-left: auto; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; overflow-x: hidden; overflow-y: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: rgb(249, 250, 251); float: none; max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px;">
      <div class="header" id="igw6" style="box-sizing: border-box; background-position-x: initial; background-position-y: initial; background-origin: initial; background-clip: initial; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; font-family: Arial, Helvetica, sans-serif; background-image: unset; background-repeat: unset; background-position: unset; background-attachment: unset; background-size: unset; background-image-color: unset; background-image-gradient: unset; background-image-gradient-dir: unset; background-image-gradient-type: unset; background-color: #F97316; color: white; padding: 32px 24px; text-align: center;">
         <h1 style="box-sizing: border-box; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-size: 28px; font-weight: 600; color: white;">⭐ Customer Feedback</h1>
      </div>
      <div class="content" id="ia4o" style="box-sizing: border-box; padding-top: 32px; padding-right: 24px; padding-bottom: 32px; padding-left: 24px; background-color: #F9F9F9; padding: 32px 24px; color: #374151;">
         <p style="box-sizing: border-box;">Hi Support Team,</p>
         <p style="box-sizing: border-box;">New customer feedback has been received!</p>
         <div class="card" id="iydo1" style="box-sizing: border-box; background: #fff; padding: 20px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #F97316; text-align: center;">
            <p style="box-sizing: border-box;">⭐⭐⭐⭐⭐</p>
            <p id="ibpl4" style="box-sizing: border-box; font-size: 24px; font-weight: bold;">Rating: {{rating}}</p>
            <p style="box-sizing: border-box;">Status: New | Priority: Normal</p>
            <a href="#" id="ivxml" style="box-sizing: border-box; display: inline-block; margin-top: 10px; padding: 12px 20px; background: #F97316; color: white; border-radius: 5px; text-decoration: none;">View Full Feedback</a>
         </div>
      </div>
      <div class="footer" id="itb8j" style="box-sizing: border-box; background-color: rgb(249, 250, 251); padding-top: 24px; padding-right: 24px; padding-bottom: 24px; padding-left: 24px; background: #F9FAFB; padding: 24px; text-align: center; color: #6B7280; font-size: 14px;">
         <p style="box-sizing: border-box;">© 2025 Customer Support. All rights reserved.</p>
      </div>
   </div>
</body>
<style>
   @media (max-width: 480px) {
   .container {
   width: 90%;
   margin-top: 0px;
   margin-right: auto;
   margin-bottom: 0px;
   margin-left: auto;
   }
   .header {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .content {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   .footer {
   padding-top: 20px;
   padding-right: 20px;
   padding-bottom: 20px;
   padding-left: 20px;
   }
   }
</style>`,
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

    await Attribute.create({
      templateId: template9.id,
      name: 'level',
      type: AttributeType.NUMBER,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template10.id,
      name: 'bonusAmount',
      type: AttributeType.NUMBER,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template11.id,
      name: 'leadName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template11.id,
      name: 'company',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template12.id,
      name: 'meetingTitle',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template12.id,
      name: 'meetingTime',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template13.id,
      name: 'reportName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template14.id,
      name: 'metricName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template14.id,
      name: 'anomalyValue',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template15.id,
      name: 'productName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template15.id,
      name: 'currentStock',
      type: AttributeType.NUMBER,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template16.id,
      name: 'orderNumber',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template16.id,
      name: 'customerName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template17.id,
      name: 'ticketId',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template17.id,
      name: 'issue',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template18.id,
      name: 'rating',
      type: AttributeType.NUMBER,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template2.id,
      name: 'orderNumber',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template4.id,
      name: 'customerName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template4.id,
      name: 'orderNumber',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template5.id,
      name: 'trackingUrl',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    await Attribute.create({
      templateId: template7.id,
      name: 'customerName',
      type: AttributeType.TEXT,
      isRequired: true,
    })

    // Create test notification deliveries for different users
    const delivery1 = await NotificationDelivery.create({
      title: notification1.title,
      templateId: template1.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'john@example.com',
      sentAt: DateTime.now(),
    })

    const delivery2 = await NotificationDelivery.create({
      title: notification1.title,
      templateId: template1.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'jane@example.com',
      sentAt: DateTime.now(),
    })

    await NotificationDelivery.create({
      title: notification1.title,
      templateId: template2.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1234567890',
      sentAt: DateTime.now(),
    })

    await NotificationDelivery.create({
      title: notification1.title,
      templateId: template3.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_123',
      sentAt: DateTime.now(),
    })

    const delivery5 = await NotificationDelivery.create({
      title: notification2.title,
      templateId: template4.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'john@example.com',
      sentAt: DateTime.now(),
    })

    const delivery6 = await NotificationDelivery.create({
      title: notification2.title,
      templateId: template5.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1234567890',
      sentAt: DateTime.now(),
    })

    const delivery7 = await NotificationDelivery.create({
      title: notification3.title,
      templateId: template6.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_456',
      sentAt: DateTime.now(),
    })

    const delivery8 = await NotificationDelivery.create({
      title: notification4.title,
      templateId: template7.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'john@example.com',
      sentAt: DateTime.now(),
    })

    const delivery9 = await NotificationDelivery.create({
      title: notification5.title,
      templateId: template8.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1234567890',
      sentAt: DateTime.now(),
    })

    // User 2's deliveries (Mobile Game & CRM)
    await NotificationDelivery.create({
      title: notification6.title,
      templateId: template9.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_789',
      sentAt: DateTime.now(),
    })

    await NotificationDelivery.create({
      title: notification7.title,
      templateId: template10.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'player@game.com',
      sentAt: DateTime.now(),
    })

    await NotificationDelivery.create({
      title: notification8.title,
      templateId: template11.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1987654321',
      sentAt: DateTime.now(),
    })

    await NotificationDelivery.create({
      title: notification9.title,
      templateId: template12.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'sales@crm.com',
      sentAt: DateTime.now(),
    })

    // User 3's deliveries (Analytics)
    await NotificationDelivery.create({
      title: notification10.title,
      templateId: template13.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_analytics',
      sentAt: DateTime.now(),
    })

    await NotificationDelivery.create({
      title: notification11.title,
      templateId: template14.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'analyst@company.com',
      sentAt: DateTime.now(),
    })

    // User 4's deliveries (Inventory & Support)
    await NotificationDelivery.create({
      title: notification12.title,
      templateId: template15.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: '+1555666777',
      sentAt: DateTime.now(),
    })

    await NotificationDelivery.create({
      title: notification13.title,
      templateId: template16.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'warehouse@company.com',
      sentAt: DateTime.now(),
    })

    await NotificationDelivery.create({
      title: notification14.title,
      templateId: template17.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'device_token_support',
      sentAt: DateTime.now(),
    })

    await NotificationDelivery.create({
      title: notification15.title,
      templateId: template18.id,
      status: NotificationDeliveryStatus.SENT,
      recipient: 'support@company.com',
      sentAt: DateTime.now(),
    })

    // Create some failed deliveries for testing
    await NotificationDelivery.create({
      title: notification1.title,
      templateId: template1.id,
      status: NotificationDeliveryStatus.FAILED,
      recipient: 'invalid@email',
      failReason: 'Invalid email address',
    })

    await NotificationDelivery.create({
      title: notification1.title,
      templateId: template2.id,
      status: NotificationDeliveryStatus.FAILED,
      recipient: '+9999999999',
      failReason: 'Phone number not supported',
    })

    // Create some pending deliveries
    await NotificationDelivery.create({
      title: notification1.title,
      templateId: template3.id,
      status: NotificationDeliveryStatus.PENDING,
      recipient: 'device_token_789',
    })

    await NotificationDelivery.create({
      title: notification2.title,
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
