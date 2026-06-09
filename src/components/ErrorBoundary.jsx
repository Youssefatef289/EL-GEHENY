import { Component } from 'react'

// حدود خطأ لمنع انهيار الصفحة بالكامل إذا فشل أي عنصر ثلاثي الأبعاد
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.warn('ErrorBoundary caught an error:', error, info)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
