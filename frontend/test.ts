const ChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 3 && search_suggestion_loading) cancelToken.current?.cancel();
    if (value.length < 3) search_suggestion && setSearchSuggestion(null);

    if (value.length > 2) {
      const token = axios.CancelToken.source();
      cancelToken.current = token;
      setSearchSuggestionLoading(true);
      setTimeout(() => {
        axios
          .get(http://localhost/search-profile/${value}, {
            cancelToken: token.token,
          })
          .then(({ data }) => {
            setSearchSuggestionLoading(false);
            setSearchSuggestion(data);
          })
          .catch(() => {});
      }, 200);
    }
    setSearchValue(value);
  };
