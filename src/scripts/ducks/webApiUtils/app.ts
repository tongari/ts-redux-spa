interface IGetYoutubeVideoProps {
  type: string
  keyword: string
  success?: () => void
  failure?: () => void
}
export const getYoutubeVideo = ({
  type,
  keyword,
  success,
  failure,
}: IGetYoutubeVideoProps) => {
  return {
    type,
    payload: {
      request: {
        method: 'get',
        url: 'http://localhost:4000/comments',
      },
      success,
      failure,
    },
  }
}
