export interface ImageProps {
  id: number
  description: string | null
  image: {
    id: number
    documentId: string
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
      small: {
        ext: string
        url: string
        hash: string
        mime: string
        name: string
        path: string | null
        size: number
        width: number
        height: number
        sizeInBytes: number
      }
      thumbnail: {
        ext: string
        url: string
        hash: string
        mime: string
        name: string
        path: string | null
        size: number
        width: number
        height: number
        sizeInBytes: number
      }
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: string | null
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string | null
  }
}

export interface MenuProps {
  id: number
  uid: string
  title: string
  url: string
  isActive: boolean
  subMenu?: {
    title: string
    url: string
  }[]
}

export interface FooterProps {
  data: {
    copyrightText: string
    Company: {
      title: string
      url: string
    }[]
    Products: {
      title: string
      url: string
    }[]
    Support: {
      title: string
      url: string
    }[]
    subscribeTitle: string
    subscribeDescription: string
    subscribeButtonText: string
    facebookUrl: string | undefined
    twitterUrl: string | undefined
    instagramUrl: string | undefined
    linkedinUrl: string | undefined
  }
}

export interface NewsLetterParams {
  data: {
    email: string
    active: boolean
  }
}

export interface ProductProps {
  id: number
  Title: string
  Description: string
  ActionButtonText: string
  ActionButtonUrl: string
}
