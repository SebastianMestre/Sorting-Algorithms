

/*
 * Returns a pointer to the first instance of the second string in the first string.
 * Returns a pointer to the first string's null terminator if the second string is not found in the first.
 */
char* strstr (char* str, char* substr) {
	while(*str){
		for(int i = 0;; ++i){
			if(not substr[i]) return str;
			if(substr[i]!=str[i]) break;
		}
		str++;
	}
	return str;
}
