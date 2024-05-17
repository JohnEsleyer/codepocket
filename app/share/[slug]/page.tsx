'use client'

export default function Page({params} : {params: {slug: string}}){
    return <div>Slug text: {params.slug}</div>
}