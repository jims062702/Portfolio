import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Globe,
  CheckCircle2,
  Sparkles,
  User,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { profileData } from '../../data/profileData'

export const BookCallSection: React.FC = () => {
  const [selectedMeetingType, setSelectedMeetingType] = useState('discovery')
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate() + 1)
  const [selectedSlot, setSelectedSlot] = useState<string>('02:00 PM')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: '',
  })

  // Meeting options
  const meetingTypes = [
    {
      id: 'quick',
      title: 'Quick Chat & Networking',
      duration: '15 Mins',
      description: 'Introductory chat, tech alignment, or general inquiries.',
      icon: Clock,
      color: 'blue',
    },
    {
      id: 'discovery',
      title: 'Project Discovery & Scope',
      duration: '30 Mins',
      description: 'Discuss technical requirements, milestones, and estimates.',
      icon: Video,
      color: 'emerald',
    },
    {
      id: 'architecture',
      title: 'Full Architecture Consultation',
      duration: '45 Mins',
      description: 'Deep dive into system design, frontend UX, or backend APIs.',
      icon: Sparkles,
      color: 'indigo',
    },
  ]

  // Mock days of current month
  const today = new Date()
  const daysInMonth = 30
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Available slots
  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '08:00 PM',
  ]

  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitError('')

    const selectedTypeObj = meetingTypes.find(t => t.id === selectedMeetingType)
    const currentMonth = today.toLocaleString('default', { month: 'long' })
    const currentYear = today.getFullYear()

    try {
      const response = await fetch('/api/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          notes: formData.notes.trim(),
          meetingType: selectedTypeObj?.title || selectedMeetingType,
          meetingDuration: selectedTypeObj?.duration || 'N/A',
          date: `${currentMonth} ${selectedDate}, ${currentYear}`,
          timeSlot: selectedSlot,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone + ' (GMT+8)',
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to send booking request.')
      }

      setLoading(false)
      setIsSubmitted(true)
      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        })
      } catch {
        // fallback
      }
    } catch (err: any) {
      setLoading(false)
      setSubmitError(err.message || 'Something went wrong. Please try reaching out via LinkedIn.')
    }
  }

  const selectedTypeObj = meetingTypes.find(t => t.id === selectedMeetingType)

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
          <CalendarIcon size={13} />
          <span>Direct Calendar Reservation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Book a 1-on-1 Consultation
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
          Pick a date and convenient time slot for a Google Meet or Discord video call. Let's discuss your product goals.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Meeting Type & Agenda Details (4 cols) */}
            <div className="lg:col-span-4 bg-white/75 dark:bg-[#0c1527]/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 shrink-0">
                    <img
                      src="/assets/james-real.jpg"
                      alt="James Gasang"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {profileData.name}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Google Meet • Video Call
                    </p>
                  </div>
                </div>

                {/* Meeting types selection */}
                <div className="mt-5 space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select Consultation Scope
                  </label>
                  {meetingTypes.map(type => {
                    const Icon = type.icon
                    const isSelected = selectedMeetingType === type.id
                    return (
                      <div
                        key={type.id}
                        onClick={() => setSelectedMeetingType(type.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-500 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800/70 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon size={16} className={isSelected ? 'text-blue-500' : 'text-slate-400'} />
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {type.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200/50 dark:border-slate-700">
                            {type.duration}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                          {type.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Timezone Note */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center gap-2 text-xs text-slate-500">
                <Globe size={15} className="text-blue-500 shrink-0" />
                <span>
                  Detected Timezone: <strong className="text-slate-700 dark:text-slate-300">Asia/Manila (GMT+8)</strong>
                </span>
              </div>
            </div>

            {/* Right: Date, Time & Attendee Details (8 cols) */}
            <div className="lg:col-span-8 bg-white/75 dark:bg-[#0c1527]/85 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Date & Time Picker */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <CalendarCheck size={18} className="text-blue-500" />
                    <span>Choose Available Date & Time Slot</span>
                  </h3>

                  {/* Horizontal Scrollable Day Strip */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {days.slice(today.getDate(), today.getDate() + 14).map(day => (
                      <button
                        type="button"
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`flex flex-col items-center justify-center min-w-[54px] h-16 rounded-2xl border transition-all shrink-0 ${
                          selectedDate === day
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md font-bold'
                            : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-mono opacity-80">Day</span>
                        <span className="text-base font-extrabold">{day}</span>
                      </button>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div className="mt-4">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 block">
                      Available Slots for Day {selectedDate}:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map(slot => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-mono font-medium border text-center transition-all ${
                            selectedSlot === slot
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-bold'
                              : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 2: Attendee Information */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/80 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <User size={16} className="text-blue-500" />
                    <span>Your Contact Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Brief Project Agenda or Questions
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share a few bullet points about what you'd like to build or discuss..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">
                    {submitError}
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>No credit card required • Instant Google Meet link generated</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Scheduling Call...</span>
                    ) : (
                      <>
                        <span>Confirm Reservation</span>
                        <CalendarCheck size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Confirmation Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12 rounded-3xl bg-white/80 dark:bg-[#0c1527]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-center max-w-2xl mx-auto shadow-xl"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>

            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Consultation Confirmed!
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Thank you, <strong>{formData.name || 'there'}</strong>! A Google Meet calendar invitation has been prepared for Day {selectedDate} at {selectedSlot}.
            </p>

            {/* Reservation Receipt Card */}
            <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Meeting Topic:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedTypeObj?.title} ({selectedTypeObj?.duration})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Slot:</span>
                <span className="font-semibold text-blue-500 font-mono">
                  Day {selectedDate} • {selectedSlot} (GMT+8)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Host:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  James Gasang (Full-Stack Engineer)
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: '', email: '', notes: '' })
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs"
            >
              Book Another Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
