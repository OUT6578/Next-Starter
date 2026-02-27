const mongoose = require('mongoose');

const videoTrackingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    videoId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Video',
      required: true,
    },
    watchedDuration: {
      type: Number,
      default: 0,
    },
    totalDuration: {
      type: Number,
      required: true,
    },
    watchedPercent: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    lastPosition: {
      type: Number,
      default: 0,
    },
    skippedSegments: [
      {
        start: Number,
        end: Number,
      },
    ],
    watchSessions: [
      {
        startedAt: {
          type: Date,
          default: Date.now,
        },
        endedAt: Date,
        deviceInfo: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

videoTrackingSchema.pre('save', function (next) {
  if (this.totalDuration > 0) {
    this.watchedPercent = Math.round(
      (this.watchedDuration / this.totalDuration) * 100
    );
    if (this.watchedPercent >= 90) {
      this.isCompleted = true;
    }
  }
  next();
});

const VideoTracking = mongoose.model('VideoTracking', videoTrackingSchema);
module.exports = VideoTracking;
