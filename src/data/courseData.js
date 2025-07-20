export const courseData = {
  type: 'course',
  id: 'video-embed-test',
  title: '🎥 Greta Video Test: Tai Chi Form',
  description: 'This course module tests video embedding within Greta.',
  
  onStart: [
    {
      action: 'showToast',
      message: '✅ Course Loaded. Video module is ready.'
    }
  ],
  
  modules: [
    {
      id: 'tai-chi-video-module',
      title: 'Watch: Tai Chi Practice',
      content: `## 🌄 Sun Rises, Moon Sets

Please watch the embedded Tai Chi video below. After viewing, click "Complete Module" to test the trigger.

<Video url="https://www.youtube.com/watch?v=vahUgtuY_Jw" />`,
      
      onComplete: [
        {
          action: 'showToast',
          message: '✅ You completed the video module!'
        }
        // Optional: Send email notification
        // {
        //   action: 'sendEmail',
        //   to: 'dan@path4change.com',
        //   subject: '🎥 Greta Video Module Viewed',
        //   body: `The user has completed watching the Tai Chi video.
        //
        //     User: {{user.name}} ({{user.email}})
        //     Module: tai-chi-video-module
        //     Time: {{timestamp}}`
        // }
      ]
    }
  ],
  
  userFields: [
    {
      id: 'name',
      label: 'Your Name',
      type: 'text'
    },
    {
      id: 'email',
      label: 'Your Email',
      type: 'email'
    }
  ]
};