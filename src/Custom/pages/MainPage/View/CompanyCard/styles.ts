import styled from 'styled-components'

export const CompanyCardStyled = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
  .card-photo {
    position: relative;
    background: #e9e5d9;
  }
  .card-photo > a {
    display: block;
  }
  img {
    width: 100%;
    aspect-ratio: 3 / 2;
    height: auto;
    display: block;
    object-fit: cover;
  }
  .photo-label {
    position: absolute;
    top: 12px;
    left: 12px;
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 11px;
    background: #faf9f5ed;
    color: #465248;
  }
  .gallery-controls {
    display: flex;
    align-items: center;
    gap: 12px;
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 30px;
    padding: 2px;
    background: #173f2ee6;
    color: white;
    font-size: 12px;
    white-space: nowrap;
  }
  .gallery-controls button {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    background: transparent;
    border: 0;
    color: white;
    border-radius: 50%;
  }
  .gallery-controls button:hover {
    background: #ffffff25;
  }
  .card-body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  h3 {
    font:
      26px/1.2 Georgia,
      serif;
    overflow-wrap: anywhere;
  }
  .card-intro {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 14px;
    margin-top: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card-links {
    padding-top: 26px;
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
    font-size: 13px;
  }
  .card-links a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colors.primary};
  }
`
